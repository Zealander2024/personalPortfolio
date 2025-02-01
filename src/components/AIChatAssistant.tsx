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
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-50"
      >
        <Bot className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6" />
                <span className="font-semibold">OrlanDev Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 p-1 rounded">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  <span className="text-sm text-gray-500">Assistant is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Suggested questions:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 text-gray-600"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 