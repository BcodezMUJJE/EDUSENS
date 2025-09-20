import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

// Intent patterns and their responses
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
  }
};

// Intent detection with regex + fallback
const findIntent = (text) => {
  const lowercaseText = text.toLowerCase();

  for (const [intent, data] of Object.entries(intents)) {
    for (const pattern of data.patterns) {
      // Check for exact match
      if (lowercaseText.includes(pattern)) {
        return typeof data.response === "function" 
          ? data.response() 
          : data.response;
      }
      
      // Try more flexible matching (split words and check if most are present)
      const patternWords = pattern.split(' ');
      if (patternWords.length > 1) {
        let matchCount = 0;
        patternWords.forEach(word => {
          if (lowercaseText.includes(word) && word.length > 2) { // Only count words longer than 2 chars
            matchCount++;
          }
        });
        
        // If most words match (at least 70%), consider it a match
        if (matchCount >= Math.ceil(patternWords.length * 0.7)) {
          return typeof data.response === "function" 
            ? data.response() 
            : data.response;
        }
      }
    }
  }

  const fallbackResponses = [
    "🤔 I didn't get that. Try asking about services, job shadowing, or contact info.",
    "Can you rephrase? I can tell you about our services, education programs, or contacts.",
    "Hmm... not sure I understood. Would you like info on our programs?",
    "Sorry, I missed that. Maybe ask about registration, services, or fees?"
  ];

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  // Initial bot message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: findIntent("hello"), sender: "bot" }]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);

    setTimeout(() => {
      const botResponse = findIntent(userInput);
      setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
    }, 600);

    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          💬 Chat with EduBot
        </button>
      ) : (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>EduBot</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.sender === "bot" && <div className="bot-avatar">🤖</div>}
                <div className="message-bubble">
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">➤</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;