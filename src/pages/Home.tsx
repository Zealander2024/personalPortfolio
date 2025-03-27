import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { ArrowRight, Code2, Database, Layout, Server, ArrowDown, Mail, Cpu, Bot, Calculator, Briefcase, Laptop, BookOpen, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const RatingsCarousel = lazy(() => import('../components/RatingsCarousel'));

export default function Home() {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [
        'Orlandiv Services',
        'Full Stack Developer',
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
    <>
      <style>{typingStyles}</style>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background elements remain the same */}
        
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
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10"
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
      </div>

      {/* Skills Section */}
      <div className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Expertise</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Combining technical knowledge with creative problem-solving to deliver exceptional solutions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
              key={skill.name}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-4 rounded-lg inline-block mb-4">
                  <skill.icon className={`h-8 w-8 ${skill.iconClass}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-gray-400">
               {skill.caption} 
              </p>
              </motion.div>
            ))}
        </div>
        </div>
      </div>

      {/* Updated CTA Section */}
      <motion.div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="backdrop-blur-lg bg-white/5 rounded-3xl p-12 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.h2 
                className="text-5xl sm:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
          Let's work together
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
          I'm always interested in hearing about new projects and opportunities.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
        <Link
          to="/contact"
                  className="inline-flex items-center px-8 py-4 text-lg rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 group"
        >
                  <span>Get in touch</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
              </motion.div>
      </div>
          </motion.div>
    </div>
      </motion.div>

      <Suspense fallback={<div>Loading...</div>}>
        <RatingsCarousel />
      </Suspense>
    </>
  );
}