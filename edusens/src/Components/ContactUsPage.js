import React, { useState, useEffect, useRef } from 'react';
import QueryForm from './QueryForm';

const ContactUsPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello 👋, I\'m EduBot. I can tell you a bit about EduSens Africa and help guide you on career learning courses for children.', sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Define intents and their corresponding patterns and responses
  const intents = {
    greeting: {
      patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'greetings'],
      response: "Hi 👋 Welcome to EduSens Africa! I'm your virtual assistant, here to help you explore careers, education programs, and real-world job experiences. What would you like to know about today?"
    },
    services: {
      patterns: ['what services do you offer', 'tell me about your services', 'what do you do', 'services'],
      response: "We currently offer three main services:\n1️⃣ AI Career Guidance (Available across Africa)\n2️⃣ Career Education Programs (Available across Africa)\n3️⃣ Job Shadowing (Currently in Kenya only)\nWhich one would you like to learn more about?"
    },
    aiCareerGuidance: {
      patterns: ['tell me about ai career guidance', 'career guidance', 'career quiz', 'ai career guidance'],
      response: "Our AI Career Guidance helps you discover careers that align with your strengths, personality, and interests 🎯. You'll interact with our AI through an exciting quiz—the more you share, the better the feedback you get. Would you like me to show you how to get started?"
    },
    careerEducation: {
      patterns: ['tell me about career education', 'career education', 'career programs'],
      response: "Our Career Education Program is a 3-week journey that begins with training on motivation, self-belief, and personal development before diving deep into your chosen career.\n\nYou'll explore:\n\n• Educational requirements\n\n• Institutions offering the program\n\n• Job opportunities & skills needed\n\n• Insights from real professionals, details of the job duties\n\n🗓 Runs during school holidays (April, August, November–December).\n📱💻 Accessible via phone, computer, or laptop with internet.\nParents can also sign up for progress updates as students hit milestones."
    },
    jobShadowing: {
      patterns: ['tell me about job shadowing', 'job shadowing', 'shadowing program'],
      response: "Our Job Shadowing program offers a 3-day real-world experience with a qualified professional in your chosen field. You'll see what the career is really like—virtually or physically (depending on your preference and the profession).\n\n📍 Currently available in Kenya only, during school holidays, and must be booked in advance. Would you like me to share how to apply?"
    },
    support: {
      patterns: ['i need help', 'support', 'contact', 'how can i reach you'],
      response: "I can help you with:\n1️⃣ Service Information\n2️⃣ Program Registration\n3️⃣ Parent Updates\n4️⃣ Contact Support Team\n5️⃣ Social Media Links"
    },
    parentUpdates: {
      patterns: ['how can parents track progress', 'parent updates', 'parents info'],
      response: "Parents can sign up alongside their children to receive updates on their child's progress and milestones 🎯. Would you like me to guide you on how to enroll for updates?"
    },
    contact: {
      patterns: ['how do i contact you', 'contact info', 'email', 'whatsapp'],
      response: "You can reach us at:\n📧 Email: info@edusensafrica.com\n\n📲 WhatsApp: +254790966319"
    },
    socialMedia: {
      patterns: ['social media', 'facebook', 'twitter', 'youtube', 'x'],
      response: "Follow us for updates:\nYouTube: EduSens Africa\nFacebook: EduSens Africa\nX (Twitter): @edusensafrica"
    },
    whoCanJoin: {
      patterns: ['who can join', 'eligibility', 'who is this for'],
      response: "Our AI Career Guidance and Career Education programs are open to all users across Africa. Job shadowing is currently available in Kenya 🇰🇪."
    },
    programTiming: {
      patterns: ['when are your programs', 'schedule', 'when do they run'],
      response: "Our Career Education and Job Shadowing programs run during school holidays: April, August, and November–December."
    },
    duration: {
      patterns: ['how long are the programs', 'duration', 'length of program'],
      response: "Career Education → 3 weeks; Job Shadowing → 3 days"
    },
    onlineOrPhysical: {
      patterns: ['are your services online', 'virtual or physical', 'how to access'],
      response: "All our programs can be accessed online through mobile phone, computer, or laptop with an internet connection. Job Shadowing can be virtual or physical."
    },
    parentTracking: {
      patterns: ['can parents track progress', 'do parents get updates'],
      response: "Yes ✅ Parents can sign up for updates."
    },
    registration: {
      patterns: ['how do i register', 'sign up', 'join program'],
      response: "You can register by contacting us on WhatsApp: +254790966319 or email: info@edusensafrica.com"
    },
    fees: {
      patterns: ['is it free', 'cost', 'fees', 'pricing'],
      response: "Our programs have affordable fees depending on the service."
    },
    closing: {
      patterns: ['thanks', 'goodbye', 'end chat', 'bye'],
      response: "Thanks for chatting with EduSens Africa today. Don't forget to follow us on YouTube, Facebook, and X for updates. Wishing you success on your career journey 🚀 Come back anytime for more guidance!"
    },
    fallback: {
      response: "I'm not sure I understand. Would you like to know about our services, career guidance, education programs, or job shadowing opportunities? You can also ask about how to contact us or get support."
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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMsg = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInputMessage('');
    
    // Identify intent and get response
    const intent = identifyIntent(userMsg);
    const botResponse = intents[intent].response;
    
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

  const handlePhoneClick = () => {
    window.location.href = 'tel:+254790966319';
  };

  const handleMeetClick = () => {
    // In a real implementation, this would open Google Meet within the app
    window.open('https://meet.google.com/', '_self');
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

              <div className="contact-item" onClick={handlePhoneClick}>
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="contact-text">
                  <p>Phone</p>
                  <p className="contact-value">+254790966319</p>
                </div>
              </div>
            </div>
          </div>

          <div className="meet-card">
            <h2>Instant Video Meeting</h2>
            <p>Connect with our team via Google Meet for immediate assistance</p>
            <button className="meet-button" onClick={handleMeetClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
              </svg>
              Start Google Meet
            </button>
          </div>
        </div>
        
        {/* Add the query form section */}
        <div className="query-section">
          <QueryForm />
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
                setInputMessage('What services do you offer?');
                handleSendMessage({ preventDefault: () => {} });
              }}>Services</button>
              <button onClick={() => {
                setInputMessage('Career guidance');
                handleSendMessage({ preventDefault: () => {} });
              }}>Career Guidance</button>
              <button onClick={() => {
                setInputMessage('Contact info');
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
        
        .contact-info-card, .meet-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .contact-info-card:hover, .meet-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .contact-info-card h2, .meet-card h2 {
          font-size: 1.5rem;
          color: #1e293b;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .contact-info-card p, .meet-card p {
          color: #64748b;
          margin-bottom: 1.5rem;
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
        
        .meet-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: #0ea5e9;
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
        
        .meet-button:hover {
          background-color: #0284c7;
        }
        
        .meet-button svg {
          width: 1.25rem;
          height: 1.25rem;
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
          padding: 2rem;
          background-color: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        @media (max-width: 640px) {
          .page-header h1 {
            font-size: 2rem;
          }
          
          .contact-info-card, .meet-card {
            padding: 1.5rem;
          }
          
          .chatbot-widget {
            right: 1rem;
            bottom: 1rem;
            width: calc(100vw - 2rem);
          }
          
          .query-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;