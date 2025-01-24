import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Minimize2, Maximize2, MessageSquare, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// AI Knowledge Base
const AI_KNOWLEDGE = {
  personal_info: {
    name: "John Orland Sudoy",
    role: "Full Stack Developer",
    location: "Baesa Jordan, Quezon City, Philippines",
    email: "johnorladnsudoy49@gmail.com",
    phone: "+63 (99) 12961716",
    skills: ["React", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL", "AWS", "Docker"],
    introduction: "I'm a passionate Full Stack Developer specializing in modern web technologies."
  },
  awards: [
    {
      title: "Best Developer of the Year",
      organization: "Tech Innovators",
      year: 2023,
      description: "Awarded for outstanding performance and contributions in web development."
    },
    {
      title: "Innovation Award",
      organization: "Web Dev Conference",
      year: 2022,
      description: "Recognized for creating innovative solutions in the field of web development."
    }
  ],
  
  responses: [
    {
      keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
      answers: [
        "Hello! I'm your AI guide to John Orland's portfolio. How may I assist you today? 👋",
        "Hi there! I'd love to tell you about John Orland's work and expertise. What would you like to know? ✨",
        "Welcome! I'm here to help you learn more about John Orland's skills and projects. What interests you? 🚀"
      ]
    },
    {
      keywords: ["projects", "work", "portfolio", "applications", "apps", "websites"],
      answers: [
        "John has developed several impressive projects, including full-stack web applications, e-commerce platforms, and API integrations. Would you like to know about any specific type? 💻",
        "Some of John's notable projects include custom CMS systems, real-time chat applications, and automated workflow tools. Which area interests you most? 🛠️",
        "John's portfolio showcases his expertise in both frontend and backend development. He's particularly proud of his work in [specific project]. Would you like to know more? 🎯"
      ]
    },
    {
      keywords: ["contact", "hire", "reach", "email", "phone", "message"],
      answers: [
        `You can reach John at johnorladnsudoy49@gmail.com or call +63 (99) 12961716. He's always excited to discuss new opportunities! 📧`,
        "Looking to collaborate? John is available for freelance projects and full-time opportunities. Would you like his contact details? 🤝",
        "The best way to reach John is through email or LinkedIn. Shall I provide you with his professional profiles? 📱"
      ]
    },
    {
      keywords: ["skills", "experience", "expertise", "technologies", "tech stack", "languages"],
      answers: [
        "John is proficient in React, Node.js, TypeScript, and Python. He also has extensive experience with cloud services like AWS. Which technology interests you? 🔧",
        "As a Full Stack Developer, John excels in both frontend (React, Vue) and backend (Node.js, Python) development. He's also skilled in database design and API integration. 💪",
        "John's technical expertise includes modern web frameworks, cloud services, and DevOps practices. Would you like specific details about any area? ⚡"
      ]
    },
    {
      keywords: ["education", "background", "study", "degree", "university"],
      answers: [
        "John has a strong educational background in Computer Science, complemented by continuous self-learning and professional certifications. 🎓",
        "Besides formal education, John regularly updates his skills through online courses and practical project work. 📚",
        "John combines academic knowledge with hands-on experience in the latest web technologies. 🌟"
      ]
    },
    {
      keywords: ["frontend", "ui", "design", "react", "vue", "web"],
      answers: [
        "In frontend development, John specializes in React and modern CSS frameworks. He creates responsive, accessible, and performant user interfaces. 🎨",
        "John's frontend work focuses on creating intuitive user experiences with modern frameworks like React and Vue.js. 🖥️",
        "For UI/UX, John follows best practices in responsive design and accessibility, ensuring great user experiences across all devices. ✨"
      ]
    },
    {
      keywords: ["backend", "server", "api", "database", "cloud"],
      answers: [
        "John's backend expertise includes Node.js, Python, and various database technologies. He's built scalable APIs and microservices. 🔒",
        "On the backend, John works with Node.js and Python, implementing RESTful APIs and database solutions. Would you like specific examples? 🛡️",
        "John has experience with both SQL and NoSQL databases, as well as cloud services like AWS and Azure. 🌐"
      ]
    }
  ],
  services: {
    "web_development": {
      keywords: ["web development", "website", "web app", "development services"],
      answers: [
        "I offer comprehensive web development services including frontend, backend, and database development. Would you like to know more about a specific aspect? 💻",
        "My web development services cover everything from responsive UI design to scalable backend solutions. What type of project are you interested in? 🌐",
        "I specialize in creating modern web applications using React, Node.js, and other cutting-edge technologies. Shall I tell you more about my development process? ⚡"
      ]
    },
    "mobile_development": {
      keywords: ["mobile", "app", "ios", "android", "mobile development"],
      answers: [
        "I develop cross-platform mobile applications using React Native and Flutter. Would you like to discuss your mobile app idea? 📱",
        "My mobile development services ensure your app works smoothly on both iOS and Android platforms. What features are you looking for? 🚀",
        "From concept to deployment, I handle all aspects of mobile app development. Shall we discuss your requirements? 📲"
      ]
    },
    "ui_design": {
      keywords: ["ui", "ux", "design", "interface", "user experience"],
      answers: [
        "I create intuitive and beautiful user interfaces following modern design principles. Would you like to see some examples? 🎨",
        "My UI/UX design process focuses on creating engaging user experiences that drive results. What's your design vision? ✨",
        "I combine aesthetics with functionality to create memorable user interfaces. Shall I explain my design approach? 🎯"
      ]
    },
    "cloud_services": {
      keywords: ["cloud", "aws", "azure", "hosting", "deployment"],
      answers: [
        "I provide cloud solutions using AWS and Azure, ensuring scalability and reliability. What cloud services interest you? ☁️",
        "From cloud hosting to serverless architecture, I can help optimize your infrastructure. Would you like more details? 🚀",
        "I implement secure and cost-effective cloud solutions for businesses of all sizes. Shall we discuss your cloud needs? 🔒"
      ],
      
    }
  }
};



export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleAIResponse("Hi! I'm John Orland's AI assistant. How can I help you today?");
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = (keyword: string): string => {
    // First check service-specific keywords
    for (const service of Object.values(AI_KNOWLEDGE.services)) {
      if (service.keywords.some(k => keyword.toLowerCase().includes(k))) {
        const randomIndex = Math.floor(Math.random() * service.answers.length);
        return service.answers[randomIndex];
      }
    }

    // Then check general responses
    const matchingCategory = AI_KNOWLEDGE.responses.find(category =>
      category.keywords.some(k => keyword.toLowerCase().includes(k))
    );

    if (matchingCategory) {
      const randomIndex = Math.floor(Math.random() * matchingCategory.answers.length);
      return matchingCategory.answers[randomIndex];
    }

    return "I'd be happy to help you learn more about our services. What specific area are you interested in?";
  };

  const handleAIResponse = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    const aiResponse = getRandomResponse(inputMessage);
    handleAIResponse(aiResponse);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open AI Chat Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed ${isMinimized ? 'bottom-20 sm:bottom-24' : 'bottom-4 sm:bottom-8'} right-4 sm:right-8 z-50 w-[calc(100%-2rem)] sm:w-[400px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="h-6 w-6 text-white mr-2" />
                <h3 className="text-white font-medium">AI Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:text-indigo-200 transition-colors p-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMinimized ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-indigo-200 transition-colors p-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="h-[60vh] sm:h-[400px] overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'assistant' && (
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2 flex-shrink-0">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white ml-4'
                            : 'bg-gray-100 text-gray-800'
                        } shadow-sm`}
                      >
                        <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2 flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg shadow-sm">
                        <motion.div
                          className="flex space-x-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <span>•</span>
                          <span>•</span>
                          <span>•</span>
                        </motion.div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <motion.button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 sm:px-4 sm:py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isTyping}
                    >
                      <Send className="h-5 w-5" />
                    </motion.button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 