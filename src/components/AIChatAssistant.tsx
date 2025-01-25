import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

const portfolioInfo = {
  owner: {
    name: "John Orland Sudoy",
    role: "Full Stack Developer & UI/UX Designer",
    location: "Philippines",
    expertise: [
      "Full Stack Development",
      "UI/UX Design",
      "Mobile Development",
      "Cloud Services",
      "MATLAB Development",
      "Robotics",
      "AI Model Training"
    ]
  },
  services: {
    webDev: {
      title: "Web Development",
      description: "Custom web applications with modern technologies",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"]
    },
    mobileDev: {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      technologies: ["React Native", "Flutter", "iOS", "Android"]
    },
    aiServices: {
      title: "AI Services",
      description: "Custom AI model development and training",
      specialties: ["Machine Learning", "Deep Learning", "Neural Networks"]
    }
  },
  contact: {
    github: "https://github.com/Zealander2024",
    linkedin: "https://www.linkedin.com/in/john-orland-sudoy-75580a31b/",
    booking: "https://gleeful-selkie-09af35.netlify.app/"
  }
};

const suggestedQuestions = [
  "What services do you offer?",
  "Can you tell me about your experience?",
  "How can I book a consultation?",
  "What technologies do you use?",
  "Can you help with my project?",
  "What are your rates?"
];

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: `Hi! I'm OrlanDev's AI assistant. I can help you learn about John Orland's services, experience, and how to get in touch. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
      return `I offer various services including:\n${portfolioInfo.owner.expertise.map(exp => `• ${exp}`).join('\n')}\n\nWould you like to know more about any specific service?`;
    }
    
    if (lowerMessage.includes('book') || lowerMessage.includes('consult')) {
      return `You can book a consultation through my booking platform at ${portfolioInfo.contact.booking}.\n\nWould you like me to guide you through the booking process?`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return `I'm ${portfolioInfo.owner.name}, a ${portfolioInfo.owner.role} based in ${portfolioInfo.owner.location}.\n\nI specialize in creating full-stack applications, with expertise in:\n• Web Development using ${portfolioInfo.services.webDev.technologies.join(', ')}\n• Mobile Development using ${portfolioInfo.services.mobileDev.technologies.join(', ')}\n• ${portfolioInfo.services.aiServices.description}\n\nWould you like to see some of my projects?`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return `You can reach me through:\n• LinkedIn: ${portfolioInfo.contact.linkedin}\n• GitHub: ${portfolioInfo.contact.github}\n• Or book a consultation: ${portfolioInfo.contact.booking}\n\nHow would you prefer to connect?`;
    }
    
    // Default response
    return [
      "I'm here to help! You can ask me about:",
      "• Services and expertise",
      "• Project consultation",
      "• Booking information",
      "• Technologies and skills",
      "• Contact information",
      "",
      "What would you like to know more about?"
    ].join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user' as const,
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(async () => {
      const response = await generateResponse(userMessage.content);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button - Fixed at bottom right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Bot className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed inset-0 sm:inset-auto sm:right-4 sm:bottom-20 sm:w-96 sm:h-[600px] 
          bg-white rounded-lg shadow-xl z-40 transition-all duration-300 transform
          ${isOpen 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full sm:translate-y-8 opacity-0 pointer-events-none'
          }`}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-indigo-600" />
            <h3 className="font-semibold text-gray-800">AI Assistant</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 sm:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-8rem)]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="border-t p-4 bg-white rounded-b-lg"
        >
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
} 