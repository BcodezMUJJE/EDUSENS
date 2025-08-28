import React, { useState, useEffect, useRef } from 'react';

/**
 * =============================
 * EduSens Africa Contact Page
 * Single-file React implementation
 * =============================
 * Features:
 *  - Google Meet link creation via Google Calendar API (requires OAuth access token)
 *  - Sendbird in-app messaging (requires @sendbird/uikit-react dependency & App ID)
 *  - Floating AI chatbot (calls your backend AI endpoint)
 *  - Email form (posts to your contact endpoint)
 *
 * External Dependencies (install):
 *   npm i @sendbird/uikit-react @sendbird/chat
 *
 * Environment Variables (example):
 *   REACT_APP_SENDBIRD_APP_ID=YOUR_SENDBIRD_APP_ID
 *   REACT_APP_CONTACT_ENDPOINT=/api/contact
 *   REACT_APP_AI_CHAT_ENDPOINT=/api/ai-chat
 *
 * Google OAuth:
 *   - Acquire an OAuth 2.0 access token with scope:
 *       https://www.googleapis.com/auth/calendar.events
 *   - Store it (e.g., window.googleAccessToken or context) before this page is used.
 *
 * SECURITY NOTE:
 *   Never expose secrets (API keys) directly in front-end if avoidable; proxy through backend.
 */

// ---- Constants / Helpers ----
const CALENDAR_ENDPOINT = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

// Basic email validator
const isEmail = (val) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);

// ---- Google Meet Hook (inline) ----
function useCreateMeetLink() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMeetLink = async ({ summary, description, durationMinutes = 30 }) => {
    setLoading(true);
    setError(null);
    try {
      const token = window?.googleAccessToken;
      if (!token) throw new Error('Google access token not found. Authenticate first.');

      const start = new Date();
      const end = new Date(start.getTime() + durationMinutes * 60000);

      const body = {
        summary,
        description,
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
        conferenceData: {
          createRequest: {
            requestId: 'edusens-' + Date.now(),
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        }
      };

      const res = await fetch(`${CALENDAR_ENDPOINT}?conferenceDataVersion=1`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Calendar API error: ${txt}`);
      }
      const json = await res.json();
      const meetLink = json?.hangoutLink || json?.conferenceData?.entryPoints?.[0]?.uri;
      if (!meetLink) throw new Error('No Meet link returned');
      return meetLink;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createMeetLink, loading, error };
}

// ---- AI Chat Service (inline) ----
async function sendAIMessage(messages) {
  const endpoint = process.env.REACT_APP_AI_CHAT_ENDPOINT || '/api/ai-chat';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  if (!res.ok) throw new Error('AI service error');
  const data = await res.json();
  return data.reply || 'No response available.';
}

// ---- Email Service (inline) ----
async function sendEmail({ name, email, subject, message }) {
  const endpoint = process.env.REACT_APP_CONTACT_ENDPOINT || '/api/contact';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to send email');
  }
  return res.json();
}

// ---- Sendbird Minimal Setup (inline) ----
import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { SendBirdProvider, ChannelList, Channel } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';

let sbInstance = null;
async function initSendbirdUser(userId, nickname) {
  if (sbInstance) return sbInstance;
  sbInstance = await SendbirdChat.init({
    appId: process.env.REACT_APP_SENDBIRD_APP_ID,
    modules: [GroupChannelModule]
  });
  await sbInstance.connect(userId);
  if (nickname) {
    await sbInstance.updateCurrentUserInfo({ nickname });
  }
  ensureSupportChannel(sbInstance);
  return sbInstance;
}
async function ensureSupportChannel(sb) {
  try {
    const query = sb.groupChannel.createMyGroupChannelListQuery({});
    const channels = await query.next();
    const existing = channels.find(c => c.name === 'EduSens Support');
    if (!existing) {
      await sb.groupChannel.createChannel({
        name: 'EduSens Support',
        invitedUserIds: [], // Add admin IDs if needed
        isDistinct: false
      });
    }
  } catch (e) {
    console.warn('Support channel setup issue', e);
  }
}

// ---- Subcomponents (within single file) ----

// Google Meet Section
function GoogleMeetSection() {
  const { loading, error, createMeetLink } = useCreateMeetLink();
  const [meetLink, setMeetLink] = useState('');
  const [showRaw, setShowRaw] = useState(false);

  const handleCreate = async () => {
    const link = await createMeetLink({
      summary: 'EduSens Africa Support Call',
      description: 'Support session via Contact Page',
      durationMinutes: 30
    });
    if (link) setMeetLink(link);
  };

  return (
    <div className="contact-card span-2">
      <h2>Live Video Support</h2>
      <p className="section-desc">Create a Google Meet link to connect with our support team.</p>

      {!meetLink && (
        <button className="btn primary" disabled={loading} onClick={handleCreate}>
          {loading ? 'Generating…' : 'Create Google Meet'}
        </button>
      )}

      {error && <div className="alert error">{error}</div>}

      {meetLink && (
        <div className="meet-link-box">
          <p className="small-label">Meet Link:</p>
          <div className="meet-link-row">
            <a href={meetLink} target="_blank" rel="noopener noreferrer" className="meet-anchor">
              {meetLink}
            </a>
            <button
              className="btn subtle"
              onClick={() => navigator.clipboard.writeText(meetLink)}
            >
              Copy
            </button>
          </div>
          <div className="meet-actions">
            <button className="btn secondary" onClick={() => setMeetLink('')}>New Link</button>
            <button className="btn ghost" onClick={() => setShowRaw(s => !s)}>
              {showRaw ? 'Hide Info' : 'Embed Notes'}
            </button>
          </div>
          {showRaw && (
            <p className="embed-note">
              Google Meet embedding is limited; standard practice is opening the link in a new tab.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Messaging Section
function MessagingSection() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [activeChannelUrl, setActiveChannelUrl] = useState('');

  useEffect(() => {
    setUser({
      userId: 'demo-' + Math.floor(Math.random() * 10000),
      nickname: 'Guest User'
    });
  }, []);

  useEffect(() => {
    if (user) {
      initSendbirdUser(user.userId, user.nickname)
        .then(() => setReady(true))
        .catch(e => console.error(e));
    }
  }, [user]);

  return (
    <div className="contact-card">
      <h2>In-App Messaging</h2>
      <p className="section-desc">Chat live with EduSens Africa support or community admins.</p>
      {!user && <p>Loading user...</p>}
      {user && !ready && <p>Initializing chat…</p>}
      {user && ready && (
        <div className="sb-wrapper">
          <SendBirdProvider
            appId={process.env.REACT_APP_SENDBIRD_APP_ID}
            userId={user.userId}
            nickname={user.nickname}
          >
            <div className="sb-layout">
              <aside className="sb-channel-list">
                <ChannelList
                  onChannelSelect={(channel) => setActiveChannelUrl(channel?.url)}
                  renderChannelPreview={({ channel }) => {
                    const active = activeChannelUrl === channel.url;
                    return (
                      <div
                        className={`sb-channel-preview ${active ? 'active' : ''}`}
                        onClick={() => setActiveChannelUrl(channel.url)}
                      >
                        <span>{channel.name || 'Channel'}</span>
                      </div>
                    );
                  }}
                />
              </aside>
              <section className="sb-channel-window">
                {activeChannelUrl ? (
                  <Channel channelUrl={activeChannelUrl} />
                ) : (
                  <div className="placeholder">
                    <p>Select a channel to start messaging.</p>
                  </div>
                )}
              </section>
            </div>
          </SendBirdProvider>
        </div>
      )}
    </div>
  );
}

// Email Form Section
function EmailFormSection() {
  const initialForm = { name: '', email: '', subject: '', message: '' };
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!isEmail(form.email)) return 'Valid email required';
    if (!form.subject.trim()) return 'Subject is required';
    if (form.message.trim().length < 10) return 'Message must be at least 10 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ state: 'error', error: err });
      return;
    }
    setStatus({ state: 'sending', error: null });
    try {
      await sendEmail(form);
      setStatus({ state: 'sent', error: null });
      setForm(initialForm);
    } catch (error) {
      setStatus({ state: 'error', error: error.message || 'Send failed' });
    }
  };

  return (
    <div className="contact-card">
      <h2>Email Our Team</h2>
      <p className="section-desc">Got a question or partnership idea? Write to us.</p>
      <form className="email-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label>Name<span className="req">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Email<span className="req">*</span></label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Subject<span className="req">*</span></label>
          <input name="subject" value={form.subject} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Message<span className="req">*</span></label>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="actions-row">
          <button className="btn primary" type="submit" disabled={status.state === 'sending'}>
            {status.state === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status.state === 'sent' && <span className="status success">Sent!</span>}
          {status.state === 'error' && <span className="status error">{status.error}</span>}
        </div>
      </form>
    </div>
  );
}

// Floating AI Chatbot
function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am EduSens AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (open && endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const reply = await sendAIMessage([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        aria-label="Toggle AI Chatbot"
        className={`chatbot-fab ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        {open ? '×' : 'AI'}
      </button>
      {open && (
        <div className="chatbot-panel" role="dialog">
          <header className="chatbot-header">
            <h3>EduSens AI</h3>
            <button className="close-btn" aria-label="Close chatbot" onClick={() => setOpen(false)}>×</button>
          </header>
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant">
                <div className="bubble typing">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              placeholder="Type your question..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn primary" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

// ---- Main Page Component ----
export default function ContactUsPage() {
  return (
    <main className="contact-wrapper">
      <header className="contact-hero">
        <h1>Contact EduSens Africa</h1>
        <p>Connect with us via live video, real-time chat, email, or our AI assistant.</p>
      </header>

      <section className="contact-grid">
        <GoogleMeetSection />
        <MessagingSection />
        <EmailFormSection />
      </section>

      <FloatingChatbot />
    </main>
  );
}
