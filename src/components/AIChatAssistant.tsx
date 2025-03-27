import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Loader, Minimize, Maximize } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
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

// Add detailed service information
const serviceDetails = {
  robotics: {
    programming: {
      title: "Robot Programming",
      description: "Programming and control of robotic systems.",
      features: [
        "Motion Control",
        "Path Planning",
        "Sensor Integration",
        "Robot Operating System (ROS)"
      ]
    },
    automation: {
      title: "Automation Solutions",
      description: "Custom automation solutions for industry.",
      features: [
        "Industrial Automation",
        "Process Optimization",
        "Quality Control",
        "Production Efficiency"
      ]
    },
    systemIntegration: {
      title: "System Integration",
      description: "Integrating robotics with existing systems.",
      features: [
        "Hardware Integration",
        "Software Integration",
        "Network Configuration",
        "Safety Systems"
      ]
    },
    optimization: {
      title: "Performance Optimization",
      description: "Optimizing robotic system performance.",
      features: [
        "Speed Optimization",
        "Precision Tuning",
        "Energy Efficiency",
        "Maintenance Planning"
      ]
    }
  },
  matlab: {
    algorithm: {
      title: "Algorithm Development",
      description: "Creating efficient MATLAB algorithms for complex computations.",
      features: [
        "Numerical Analysis",
        "Signal Processing",
        "Optimization Algorithms",
        "Custom Function Development"
      ]
    },
    dataAnalysis: {
      title: "Data Analysis",
      description: "Advanced data analysis and visualization solutions.",
      features: [
        "Statistical Analysis",
        "Data Visualization",
        "Pattern Recognition",
        "Time Series Analysis"
      ]
    }
  }
};

// Update suggested questions with more specific options
const suggestedQuestions = [
  {
    id: '1',
    text: "What are your robotics automation solutions?",
    category: "robotics"
  },
  {
    id: '2',
    text: "Can you help with MATLAB algorithm development?",
    category: "matlab"
  },
  {
    id: '3',
    text: "How do I book a consultation?",
    category: "booking"
  },
  {
    id: '4',
    text: "What's included in robot programming services?",
    category: "robotics"
  },
  {
    id: '5',
    text: "Tell me about your system integration expertise",
    category: "services"
  },
  {
    id: '6',
    text: "What's your experience with performance optimization?",
    category: "expertise"
  },
  {
    id: '7',
    text: "Do you offer remote collaboration?",
    category: "general"
  },
  {
    id: '8',
    text: "What data analysis services do you provide?",
    category: "matlab"
  }
];

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Hi! I'm OrlanDev Assistant. I can help you learn more about John's services and expertise. What would you like to know?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response - Replace with your actual API call
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    // Simulate AI response - Replace with your actual API call
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResponse(question),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();

    // Robotics related questions
    if (q.includes('robot') || q.includes('automation')) {
      if (q.includes('program') || q.includes('control')) {
        return `In Robot Programming, I offer: \n\n` +
          `• ${serviceDetails.robotics.programming.features.join('\n• ')}\n\n` +
          `Would you like to know more about any specific aspect of robot programming?`;
      }
      if (q.includes('automation') || q.includes('industry')) {
        return `For Automation Solutions, I provide: \n\n` +
          `• ${serviceDetails.robotics.automation.features.join('\n• ')}\n\n` +
          `Would you like to discuss your specific automation needs?`;
      }
      if (q.includes('integration') || q.includes('system')) {
        return `My System Integration services include: \n\n` +
          `• ${serviceDetails.robotics.systemIntegration.features.join('\n• ')}\n\n` +
          `How can I help with your integration requirements?`;
      }
      if (q.includes('performance') || q.includes('optimization')) {
        return `For Performance Optimization, I focus on: \n\n` +
          `• ${serviceDetails.robotics.optimization.features.join('\n• ')}\n\n` +
          `Would you like to learn more about optimizing your robotic systems?`;
      }
      return `I offer comprehensive robotics solutions including:\n\n` +
        `1. Robot Programming\n2. Automation Solutions\n3. System Integration\n4. Performance Optimization\n\n` +
        `Which aspect would you like to know more about?`;
    }

    // MATLAB related questions
    if (q.includes('matlab')) {
      if (q.includes('algorithm') || q.includes('computation')) {
        return `In MATLAB Algorithm Development, I specialize in: \n\n` +
          `• ${serviceDetails.matlab.algorithm.features.join('\n• ')}\n\n` +
          `What type of algorithm development do you need?`;
      }
      if (q.includes('data') || q.includes('analysis')) {
        return `For MATLAB Data Analysis, I offer: \n\n` +
          `• ${serviceDetails.matlab.dataAnalysis.features.join('\n• ')}\n\n` +
          `Would you like to discuss your data analysis needs?`;
      }
      return `My MATLAB development services include:\n\n` +
        `1. Algorithm Development\n2. Data Analysis\n3. Scientific Computing\n4. System Integration\n\n` +
        `Which area interests you?`;
    }

    // Booking and consultation questions
    if (q.includes('book') || q.includes('consultation') || q.includes('appointment')) {
      return `You can book a consultation in three ways:\n\n` +
        `1. Use the booking button on my website\n` +
        `2. Send me a direct message on LinkedIn\n` +
        `3. Email me at your.email@example.com\n\n` +
        `Would you like me to guide you through the booking process?`;
    }

    // Questions about experience and expertise
    if (q.includes('experience') || q.includes('expertise')) {
      return `I'm a Full Stack Developer with expertise in:\n\n` +
        `• ${portfolioInfo.owner.expertise.join('\n• ')}\n\n` +
        `Which area would you like to know more about?`;
    }

    // Questions about location and availability
    if (q.includes('location') || q.includes('available') || q.includes('where')) {
      return `I'm based in ${portfolioInfo.owner.location} and available for:\n\n` +
        `• Remote collaboration\n` +
        `• Online consultations\n` +
        `• Project-based work\n\n` +
        `Would you like to discuss a specific project?`;
    }

    // General inquiries
    return `I'd be happy to help you with that. To provide the most relevant information, could you please specify which service interests you:\n\n` +
      `1. Robotics Solutions\n` +
      `2. MATLAB Development\n` +
      `3. Full Stack Development\n` +
      `4. IoT Projects\n\n` +
      `Or feel free to ask about any specific aspect of these services.`;
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-blue-500/25"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 90 : 0 }}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '96px' : 'auto' 
            }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className={`fixed bottom-20 right-4 z-50 w-full sm:w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-white" />
                <h3 className="text-lg font-semibold text-white">OrlanDev Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? (
                    <Maximize className="h-4 w-4 text-white" />
                  ) : (
                    <Minimize className="h-4 w-4 text-white" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <div 
                ref={chatContainerRef}
                className="h-[400px] overflow-y-auto p-4 space-y-4"
              >
                {messages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <p className="text-sm text-gray-500 mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question) => (
                        <motion.button
                          key={question.id}
                          onClick={() => handleSuggestedQuestion(question.text)}
                          className="text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors whitespace-nowrap"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {question.text}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none">
                      <Loader className="h-5 w-5 animate-spin text-blue-500" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Form */}
            {!isMinimized && (
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputMessage.trim() || isLoading}
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 