import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);
  
  // Intent patterns and their corresponding responses
  const intents = {
    greeting: {
      patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'greetings', 'howdy'],
      response: "Hi 👋 Welcome to EduSens Africa! I'm your virtual assistant, here to help you explore careers, education programs, and real-world job experiences. What would you like to know about today? For more information contact us via email: info@edusensafrica.com or via WhatsApp: +254790966319"
    },
    services: {
      patterns: ['what services do you offer', 'tell me about your services', 'what do you do', 'services', 'offerings', 'what can you help with'],
      response: "We currently offer three main services:\n1️⃣ AI Career Guidance (Available across Africa)\n2️⃣ Career Education Programs (Available across Africa)\n3️⃣ Job Shadowing (Currently in Kenya only)\nWhich one would you like to learn more about?"
    },
    aiCareerGuidance: {
      patterns: ['tell me about ai career guidance', 'career guidance', 'career quiz', 'ai career guidance', 'guidance', 'career assessment'],
      response: "Our AI Career Guidance helps you discover careers that align with your strengths, personality, and interests 🎯. You'll interact with our AI through an exciting quiz—the more you share, the better the feedback you get. Would you like me to show you how to get started?"
    },
    careerEducation: {
      patterns: ['tell me about career education', 'career education', 'career programs', 'education programs', 'career training'],
      response: "Our Career Education Program is a 3-week journey that begins with training on motivation, self-belief, and personal development before diving deep into your chosen career.\n\nYou'll explore:\n\n• Educational requirements\n\n• Institutions offering the program\n\n• Job opportunities & skills needed\n\n• Insights from real professionals, details of the job duties\n\n🗓 Runs during school holidays (April, August, November–December).\n📱💻 Accessible via phone, computer, or laptop with internet.\nParents can also sign up for progress updates as students hit milestones."
    },
    jobShadowing: {
      patterns: ['tell me about job shadowing', 'job shadowing', 'shadowing program', 'work experience', 'professional shadowing'],
      response: "Our Job Shadowing program offers a 3-day real-world experience with a qualified professional in your chosen field. You'll see what the career is really like—virtually or physically (depending on your preference and the profession).\n\n📍 Currently available in Kenya only, during school holidays, and must be booked in advance. Would you like me to share how to apply?"
    },
    support: {
      patterns: ['i need help', 'support', 'contact', 'how can i reach you', 'assistance', 'customer support'],
      response: "I can help you with:\n1️⃣ Service Information\n2️⃣ Program Registration\n3️⃣ Parent Updates\n4️⃣ Contact Support Team\n5️⃣ Social Media Links"
    },
    parentUpdates: {
      patterns: ['how can parents track progress', 'parent updates', 'parents info', 'tracking progress', 'parent monitoring'],
      response: "Parents can sign up alongside their children to receive updates on their child's progress and milestones 🎯. Would you like me to guide you on how to enroll for updates?"
    },
    contact: {
      patterns: ['how do i contact you', 'contact info', 'email', 'whatsapp', 'phone number', 'reach out'],
      response: "For more information contact us via email: info@edusensafrica.com or via WhatsApp: +254790966319"
    },
    socialMedia: {
      patterns: ['social media', 'facebook', 'twitter', 'youtube', 'x', 'follow', 'social platforms'],
      response: "Follow us for updates:\nYouTube: EduSens Africa\nFacebook: EduSens Africa\nX (Twitter): @edusensafrica"
    },
    eligibility: {
      patterns: ['who can join', 'eligibility', 'who is this for', 'requirements to join'],
      response: "Our AI Career Guidance and Career Education programs are open to all users across Africa. Job shadowing is currently available in Kenya 🇰🇪."
    },
    programTiming: {
      patterns: ['when are your programs', 'schedule', 'when do they run', 'program dates', 'timing'],
      response: "Our Career Education and Job Shadowing programs run during school holidays: April, August, and November–December."
    },
    duration: {
      patterns: ['how long are the programs', 'duration', 'length of program', 'program length', 'time commitment'],
      response: "Career Education → 3 weeks; Job Shadowing → 3 days"
    },
    accessMethod: {
      patterns: ['are your services online', 'virtual or physical', 'how to access', 'online or offline', 'access method'],
      response: "All our programs can be accessed online through mobile phone, computer, or laptop with an internet connection. Job Shadowing can be virtual or physical."
    },
    registration: {
      patterns: ['how do i register', 'sign up', 'join program', 'registration process', 'enroll'],
      response: "You can register by contacting us on WhatsApp: +254790966319 or email: info@edusensafrica.com"
    },
    fees: {
      patterns: ['is it free', 'cost', 'fees', 'pricing', 'how much', 'price'],
      response: "Our programs have affordable fees depending on the service."
    },
    closing: {
      patterns: ['thanks', 'goodbye', 'end chat', 'bye', 'see you', 'thank you'],
      response: "Thanks for chatting with EduSens Africa today. For more information contact us via email: info@edusensafrica.com or via WhatsApp: +254790966319. Don't forget to follow us on YouTube, Facebook, and X for updates. Wishing you success on your career journey 🚀 Come back anytime for more guidance!"
    }
  };

  // Initial bot message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          text: intents.greeting.response, 
          sender: 'bot' 
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const findIntent = (text) => {
    const lowercaseText = text.toLowerCase();
    
    // Log to debug
    console.log('Searching for intent for:', lowercaseText);
    
    for (const [intent, data] of Object.entries(intents)) {
      for (const pattern of data.patterns) {
        if (lowercaseText.includes(pattern)) {
          console.log('Found intent:', intent, 'with pattern:', pattern);
          return intent;
        }
      }
    }
    
    // Default response if no intent is matched
    console.log('No intent found, returning unknown');
    return 'unknown';
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message to chat
    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    
    // Process user input to find intent
    const intent = findIntent(userInput);
    
    // Prepare bot response
    let botResponse;
    if (intent === 'unknown') {
      botResponse = "I'm not sure I understand. Could you rephrase that or ask about our services, career guidance, education programs, or job shadowing? For more information contact us via email: info@edusensafrica.com or via WhatsApp: +254790966319";
    } else {
      botResponse = intents[intent].response;
    }
    
    console.log('Intent:', intent, 'Response:', botResponse);
    
    // Add slight delay to bot response for natural feel
    setTimeout(() => {
      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    }, 600);
    
    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button className="chat-toggle" onClick={toggleChat}>
          <span className="chat-icon">💬</span>
          <span>Chat with EduBot</span>
        </button>
      ) : (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>EduBot</h3>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                {message.sender === 'bot' && <div className="bot-avatar">🤖</div>}
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
              onChange={handleInputChange}
              placeholder="Type your message..."
              aria-label="Message input"
            />
            <button type="submit" aria-label="Send message">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
