import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { ArrowRight, Code2, Database, Layout, Server, ArrowDown, Mail, Cpu, Bot, Calculator, Briefcase, Laptop, BookOpen, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIChatAssistant from '../components/AIChatAssistant';

const RatingsCarousel = lazy(() => import('../components/RatingsCarousel'));

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/john-orland-sudoy-75580a31b/',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Zealander2024',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  }
];

export default function Home() {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [
        'Orlandiv Services',
        'Full Stack Developer',
        'Frontend Expert',
        'Circuit designer',
        'Solution Architect',
        'IT Consultant',
        'And Build Advance Arduino Projects With AI Intigrations',
        'bring to life your study'
      ],
      typeSpeed: 40,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: '|',
      fadeOut: true,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,
      autoInsertCss: true,
      smartBackspace: true,
      preStringTyped: () => {
        const element = el.current;
        if (element && element instanceof HTMLElement) {
          element.style.whiteSpace = 'pre-wrap';
        }
      },
      onStringTyped: (arrayPos: number) => {
        // Add a smooth color transition
        const element = el.current;
        if (element && element instanceof HTMLElement) {
          const colors = ['#4F46E5', '#7C3AED', '#EC4899', '#3B82F6'];
          element.style.transition = 'color 0.5s ease';
          element.style.color = colors[arrayPos % colors.length];
        }
      }
    };

    if (el.current) {
      typed.current = new Typed(el.current, options);
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  // Add this CSS to your index.css or a styled-component
  const typingStyles = `
    .typed-cursor {
      opacity: 1;
      animation: typedjsBlink 0.7s infinite;
      -webkit-animation: typedjsBlink 0.7s infinite;
      animation: typedjsBlink 0.7s infinite;
    }
    @keyframes typedjsBlink {
      50% { opacity: 0.0; }
    }
    @-webkit-keyframes typedjsBlink {
      0% { opacity: 1; }
      50% { opacity: 0.0; }
      100% { opacity: 1; }
    }
    .typed-fade-out {
      opacity: 0;
      transition: opacity .25s;
    }
  `;

  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const skills = [
    {
      caption: 'Crafting immersive digital experiences with a blend of creativity and code.',
      name: 'Frontend Development',
      icon: Layout
    },
    {
      caption: 'Building the backbone of applications with robust and scalable server-side solutions.',
      name: 'Backend Development',
      icon: Database
    },
    {
      caption: 'Bridging the gap between front-end flair and back-end brilliance for seamless user experiences.',
      name: 'Full Stack Development',
      icon: Code2
    },
    {
      caption: 'Designing and programming microcontrollers for innovative hardware solutions and prototypes.',
      name: 'Arduino Development',
      icon: Cpu
    },
    {
      caption: 'Creating custom circuit  designs that bring electronic concepts to life.',
      name: 'Circuit Design',
      icon: Server
    },
    {
      caption: 'Developing advanced mathematical models and simulations for complex problem-solving.',
      name: 'MATLAB Development',
      icon: Calculator
    },
    {
      caption: 'Building intelligent automation systems and robotic solutions for real-world applications.',
      name: 'Robotics',
      icon: Bot
    },
    {
      caption: 'Open for commissions Build And guide you to finish your capstone Project base on Your idea and study.',
      name: 'IT consultant',
      icon: GraduationCap,
      iconClass: 'text-blue-400 group-hover:text-cyan-300 transition-colors duration-300'
    },
    {
      caption: 'I create advance portfolio website base on your skills and projects , niche , services , businesses etc .',
      name: 'Portfolio Projects',
      icon: Code2,
      iconClass: 'text-cyan-400 group-hover:text-blue-300 transition-colors duration-300'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-20, 0, 20]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Code2 className="text-blue-300/40 h-16 w-16" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <style>{typingStyles}</style>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span ref={el}></span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforming ideas into exceptional digital experiences — from modern web solutions to Arduino prototypes and custom PCB designs. Building and deploying innovative solutions that bridge software and hardware.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] mx-auto">
              <img 
                src="/logo.png" 
                alt="Animated Logo"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* New caption with DIV animation */}
            <motion.div 
              className="mt-0 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xl md:text-2xl text-slate-600 mb-4">Crafting innovative solutions with modern technology</p>
              
              <div className="flex justify-center items-center space-x-8 mt-6">
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.1, color: "#4F46E5" }}
                >
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">D</span>
                  <span className="text-sm text-gray-400 mt-1">Design</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.1, color: "#7C3AED" }}
                >
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">I</span>
                  <span className="text-sm text-gray-400 mt-1">Innovations</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.1, color: "#EC4899" }}
                >
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">V</span>
                  <span className="text-sm text-gray-400 mt-1">Visionary</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Scroll down indicator */}
          <motion.div
            role="button"
            aria-label="Scroll down"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="h-6 w-6 text-blue-400" />
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">My Expertise</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Combining technical knowledge with creative problem-solving to deliver exceptional solutions.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg inline-block mb-4">
                    <skill.icon className="h-8 w-8 text-blue-500 group-hover:text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-gray-600">
                    {skill.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Updated CTA Section */}
        <motion.div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="backdrop-blur-lg bg-white/90 rounded-3xl p-12 border border-gray-100 shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <motion.h2 
                  className="text-5xl sm:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-gray-800"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  Let's work together
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  I'm always interested in hearing about new projects and opportunities.
                </motion.p>

                {/* New Contact Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link to="/contact">
                    <motion.button
                      className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Contact Me
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </Link>

                  <a 
                    href="mailto:johnorlandsudoy49@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      className="group relative px-8 py-4 rounded-full bg-white text-blue-600 font-semibold text-lg border-2 border-blue-500 hover:border-blue-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Send Email
                      </span>
                      <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    </motion.button>
                  </a>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                  className="mt-8 flex justify-center items-center space-x-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <link.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <RatingsCarousel />
      </Suspense>

      <AIChatAssistant />
    </div>
  );
}