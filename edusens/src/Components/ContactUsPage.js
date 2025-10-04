import React, { useState, useEffect, useRef } from 'react';

const ContactUsPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);
  const messagesEndRef = useRef(null);

  // Define intents and their corresponding patterns and responses
  const intents = {
    greeting: {
      patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      response: () => {
        const hour = new Date().getHours();
        let greetingTime = "Hello";
        if (hour < 12) greetingTime = "Good morning";
        else if (hour < 18) greetingTime = "Good afternoon";
        else greetingTime = "Good evening";
        return `👋 ${greetingTime}! Welcome to EduSens Africa. How can I assist you today?`;
      }
    },
    services: {
      patterns: ["services", "what do you offer", "programs", "solutions", "offerings"],
      response: "🌍 EduSens Africa provides three main services:\n1️⃣ AI Career Guidance (Across Africa)\n2️⃣ Career Education Programs (Across Africa)\n3️⃣ Job Shadowing (Kenya only)"
    },
    aiCareerGuidance: {
      patterns: ["career guidance", "ai career guidance", "career quiz", "career assessment"],
      response: "🎯 Our AI Career Guidance helps you discover careers matching your strengths and interests. Would you like me to show you how to start?"
    },
    careerEducation: {
      patterns: ["career education", "career programs", "education programs", "career training"],
      response: "📚 Our Career Education Program is a 3-week course covering personal development, educational paths, job opportunities, and insights from professionals."
    },
    jobShadowing: {
      patterns: ["job shadowing", "shadow program", "career exposure", "work experience"],
      response: "💼 Our Job Shadowing program offers a 3-day experience with professionals in your field—virtually or physically. Available in Kenya 🇰🇪 only."
    },
    contactUs: {
      patterns: ["how do i reach out", "how do i reachout", "contact info", "contact information", "contacts", "phone number", "contact details", "email", "whatsapp"],
      response: "📩 Thanks for chatting with EduSens Africa today. Contact us at info@edusensafrica.com or WhatsApp: +254790966319."
    },
    socialMedia: {
      patterns: ["social media", "facebook", "twitter", "youtube", "x", "follow"],
      response: "📲 Follow us:\nYouTube: EduSens Africa\nFacebook: EduSens Africa\nX (Twitter): @edusensafrica"
    },
    eligibility: {
      patterns: ["who can join", "eligibility", "requirements"],
      response: "✅ AI Career Guidance & Career Education → Open to all in Africa.\n✅ Job Shadowing → Kenya only."
    },
    programTiming: {
      patterns: ["when are your programs", "schedule", "program dates", "timing"],
      response: "📅 Programs run during school holidays: April, August, Nov–Dec."
    },
    duration: {
      patterns: ["how long are the programs", "duration", "length"],
      response: "⏳ Career Education → 3 weeks\n⏳ Job Shadowing → 3 days"
    },
    accessMethod: {
      patterns: ["are your services online", "virtual or physical", "how to access"],
      response: "💻 Services are online via mobile, laptop, or PC. Job Shadowing can be virtual or physical (Kenya only)."
    },
    registration: {
      patterns: ["how do i register", "sign up", "join program", "enroll"],
      response: "📝 Register via WhatsApp: +254790966319 or Email: info@edusensafrica.com"
    },
    fees: {
      patterns: ["is it free", "cost", "fees", "pricing", "how much"],
      response: "💵 Programs are affordable and vary by service. Contact us for details."
    },
    closing: {
      patterns: ["thanks", "goodbye", "end chat", "bye", "see you"],
      response: "🙏 Thank you for chatting with EduSens Africa. Follow us on YouTube, Facebook, and X. Wishing you success 🚀"
    },
    fallback: {
      response: "I'm not sure I understand. Would you like to know about our services, career guidance, education programs, or job shadowing opportunities? You can also ask how to contact us or get support."
    }
  };

  // Function to identify the intent based on user input
  const identifyIntent = (input) => {
    const normalizedInput = input.toLowerCase().trim();
    
    for (const [intent, data] of Object.entries(intents)) {
      if (intent === 'fallback') continue;
      
      for (const pattern of data.patterns) {
        if (normalizedInput.includes(pattern.toLowerCase())) {
          return intent;
        }
      }
    }
    
    return 'fallback';
  };

  // Initial bot message on component mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const initialMessage = intents.greeting.response();
    setMessages([{ text: initialMessage, sender: 'bot' }]);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMsg = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInputMessage('');
    
    // Identify intent and get response
    const intent = identifyIntent(userMsg);
    const botResponse = typeof intents[intent].response === 'function' 
      ? intents[intent].response() 
      : intents[intent].response;
    
    // Add bot response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 600);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@edusensafrica.com';
  };

  const handleWhatsAppClick = () => {
    window.location.href = 'https://wa.me/254790966319';
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email address';
    if (!form.subject.trim()) errors.subject = 'Subject is required';
    if (!form.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 4000);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <header className="page-header">
          <h1>Contact EduSens Africa</h1>
          <p>Get in touch with us for inquiries, support, or partnership opportunities</p>
        </header>

        <div className="contact-grid">
          <div className="contact-info-card">
            <h2>Contact Information</h2>
            <div className="contact-details">
              <div className="contact-item" onClick={handleEmailClick}>
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <div className="contact-text">
                  <p>Email</p>
                  <p className="contact-value">info@edusensafrica.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="whatsapp-card">
            <h2>Contact on WhatsApp</h2>
            <p>For Inquiries: +254790966319</p>
            <button className="whatsapp-button" onClick={handleWhatsAppClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="whatsapp-icon">
                <path d="M12 2a10 10 0 0 0-8.6 15l-1.1 3.3 3.4-1.1A10 10 0 1 0 12 2zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3a8.1 8.1 0 1 1 6.8 3.7zm4.7-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8.9-.1.2-.3.2-.6.1-.8-.4-1.9-.7-2.7-2.2-.2-.4.2-.3.6-1.1.1-.1 0-.3 0-.4l-.6-1.5c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.5.5-.8 1.1-.8 1.9.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.6 4.2 3.1.6.1 1.1.2 1.7.2.5 0 1-.2 1.4-.5.3-.2.6-.5.7-.9.2-.4.2-.8.1-.9 0-.2-.2-.3-.4-.4z"/>
              </svg>
              Chat on WhatsApp
            </button>
          </div>
        </div>
        
        {/* Add the query form section */}
        <div className="query-section" aria-label="Send Us a Message">
          <form className="contact-form-card" onSubmit={handleFormSubmit} noValidate>
            <h2 className="form-title">Send Us a Message</h2>
            {formSuccess && <div className="form-success" role="status">Thank you! Your message has been sent.</div>}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleFormChange}
                className={formErrors.name ? 'error' : ''}
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {formErrors.name && <span className="form-error" id="name-error">{formErrors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleFormChange}
                className={formErrors.email ? 'error' : ''}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {formErrors.email && <span className="form-error" id="email-error">{formErrors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject of your message"
                value={form.subject}
                onChange={handleFormChange}
                className={formErrors.subject ? 'error' : ''}
                aria-invalid={!!formErrors.subject}
                aria-describedby={formErrors.subject ? 'subject-error' : undefined}
                autoComplete="off"
              />
              {formErrors.subject && <span className="form-error" id="subject-error">{formErrors.subject}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                value={form.message}
                onChange={handleFormChange}
                className={formErrors.message ? 'error' : ''}
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? 'message-error' : undefined}
                rows={5}
              />
              {formErrors.message && <span className="form-error" id="message-error">{formErrors.message}</span>}
            </div>
            <button type="submit" className="form-submit-btn" aria-label="Send message">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Chatbot Widget */}
      <div className={`chatbot-widget ${isChatOpen ? 'open' : ''}`}>
        <div className="chatbot-header" onClick={() => setIsChatOpen(!isChatOpen)}>
          <div className="chatbot-title">
            <div className="chatbot-avatar">E</div>
            <div>
              <h3>EduBot</h3>
              <p>{isChatOpen ? 'Ask me anything' : 'Online'}</p>
            </div>
          </div>
          <button className="chatbot-toggle" aria-label={isChatOpen ? 'Close chat' : 'Open chat'}>
            {isChatOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v-3.703a2 2 0 01.586-1.414l2-2a2 2 0 012.828 0l2 2a2 2 0 01.586 1.414v3.703c.865-.083 1.722-.194 2.57-.331C18.007 13.245 19 11.986 19 10.574V5.426c0-1.413-.993-2.67-2.43-2.902A41.403 41.403 0 0010 2zm0 12a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {isChatOpen && (
          <div className="chatbot-content">
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="quick-replies">
              <button onClick={() => {
                setInputMessage('services');
                handleSendMessage({ preventDefault: () => {} });
              }}>Services</button>
              <button onClick={() => {
                setInputMessage('career guidance');
                handleSendMessage({ preventDefault: () => {} });
              }}>Career Guidance</button>
              <button onClick={() => {
                setInputMessage('contact info');
                handleSendMessage({ preventDefault: () => {} });
              }}>Contact</button>
            </div>

            <form className="chatbot-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="chatbot-input"
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                aria-label="Chat message"
              />
              <button type="submit" className="chatbot-send-button" aria-label="Send message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background-color: #f8fafc;
          padding: 2rem 1rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .page-header h1 {
          font-size: 2.5rem;
          color: #1e293b;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        
        .page-header p {
          font-size: 1.125rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .contact-info-card, .whatsapp-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .contact-info-card:hover, .whatsapp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .contact-info-card h2, .whatsapp-card h2 {
          font-size: 1.5rem;
          color: #1e293b;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .contact-info-card p, .whatsapp-card p {
          color: #64748b;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 0.5rem;
          transition: background-color 0.2s;
        }
        
        .contact-item:hover {
          background-color: #f1f5f9;
        }
        
        .icon-wrapper {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background-color: #e0f2fe;
          color: #0369a1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .icon-wrapper svg {
          width: 1.5rem;
          height: 1.5rem;
        }
        
        .contact-text p:first-child {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.25rem;
        }
        
        .contact-value {
          font-weight: 500;
          color: #0ea5e9 !important;
        }
        
        .whatsapp-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background-color: #25D366; /* WhatsApp green */
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
        }
        
        .whatsapp-button:hover {
          background-color: #128C7E; /* Darker WhatsApp green */
        }
        
        .whatsapp-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
        
        /* Chatbot Styles */
        .chatbot-widget {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 24rem;
          max-width: calc(100vw - 4rem);
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          overflow: hidden;
          transition: all 0.3s ease;
          max-height: 32rem;
        }
        
        .chatbot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: #0ea5e9;
          color: white;
          cursor: pointer;
        }
        
        .chatbot-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .chatbot-avatar {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: white;
          color: #0ea5e9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.125rem;
        }
        
        .chatbot-title h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }
        
        .chatbot-title p {
          font-size: 0.875rem;
          opacity: 0.9;
          margin: 0;
        }
        
        .chatbot-toggle {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .chatbot-toggle svg {
          width: 1.25rem;
          height: 1.25rem;
        }
        
        .chatbot-content {
          display: flex;
          flex-direction: column;
          height: 28rem;
          max-height: calc(100vh - 12rem);
        }
        
        .chatbot-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.95rem;
        }
        
        .message {
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          max-width: 90%;
          line-height: 1.5;
          white-space: pre-line;
        }
        
        /* Quick reply buttons */
        .quick-replies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-top: 1px solid #e2e8f0;
        }
        
        .quick-replies button {
          background-color: #e0f2fe;
          color: #0369a1;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .quick-replies button:hover {
          background-color: #bae6fd;
        }
        
        /* Make bot messages look nicer */
        .message.bot {
          background: #f1f5f9;
          color: #334155;
          align-self: flex-start;
          border-bottom-left-radius: 0.25rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .message.user {
          background: #0ea5e9;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 0.25rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        /* Improve accessibility */
        .chatbot-widget:focus-within {
          outline: 2px solid #0ea5e9;
        }
        
        /* Add some animation for better UX */
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .message {
          animation: slideIn 0.3s ease-out;
        }
        
        /* Form structure */
        .chatbot-input-form {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-top: 1px solid #e2e8f0;
        }
        
        /* Explicit input styling */
        .chatbot-input {
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #334155;
          width: 100%;
          box-sizing: border-box;
        }
        
        .chatbot-input::placeholder {
          color: #a1a1a1;
        }
        
        .chatbot-input:focus {
          outline: none;
          border-color: #0ea5e9;
          box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.1);
        }
        
        .chatbot-send-button {
          background-color: #0ea5e9;
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          flex-shrink: 0;
        }
        
        .chatbot-send-button:hover {
          background-color: #0284c7;
        }
        
        .chatbot-send-button svg {
          width: 1.25rem;
          height: 1.25rem;
        }
        
        /* Query form section styles */
        .query-section {
          margin-top: 3rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: none;
          box-shadow: none;
          padding: 0;
        }
        .contact-form-card {
          background: #fff;
          border-radius: 1.25rem;
          box-shadow: 0 6px 24px -4px rgba(30,41,59,0.10), 0 1.5px 4px -1px rgba(30,41,59,0.06);
          padding: 2rem 2rem 1.5rem 2rem;
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin: 0 auto;
        }
        .form-title {
          font-size: 1.35rem;
          font-weight: 600;
          color: #0ea5e9;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .contact-form-card label {
          font-size: 1rem;
          font-weight: 500;
          color: #1e293b;
          margin-bottom: 0.2rem;
        }
        .contact-form-card input,
        .contact-form-card textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid #d1d5db;
          border-radius: 0.75rem;
          background: #f9fafb;
          font-size: 1rem;
          color: #334155;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
          outline: none;
        }
        .contact-form-card input:focus,
        .contact-form-card textarea:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 2px rgba(14,165,233,0.10);
          background: #fff;
        }
        .contact-form-card input.error,
        .contact-form-card textarea.error {
          border-color: #ef4444;
          background: #fef2f2;
        }
        .form-error {
          color: #ef4444;
          font-size: 0.95rem;
          margin-top: 0.1rem;
          font-weight: 500;
        }
        .form-success {
          color: #22c55e;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          text-align: center;
          background: #f0fdf4;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
        }
        .form-submit-btn {
          background: linear-gradient(90deg, #0ea5e9 60%, #0284c7 100%);
          color: #fff;
          border: none;
          border-radius: 0.75rem;
          padding: 0.85rem 0;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 0.5rem;
          box-shadow: 0 2px 8px rgba(14,165,233,0.08);
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          width: 100%;
          letter-spacing: 0.01em;
        }
        .form-submit-btn:hover,
        .form-submit-btn:focus {
          background: linear-gradient(90deg, #0284c7 60%, #0ea5e9 100%);
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 4px 16px rgba(14,165,233,0.13);
          outline: none;
        }
        @media (max-width: 640px) {
          .contact-form-card {
            padding: 1.25rem 0.75rem 1rem 0.75rem;
            max-width: 100%;
          }
          .form-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;