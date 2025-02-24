import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { ArrowRight, Code2, Database, Layout, Server, ArrowDown, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import RatingsCarousel from '../components/RatingsCarousel';

export default function Home() {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [
        'John Orland Sudoy',
        'Full Stack Developer',
        'UI/UX Designer',
        'Problem Solver'
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
    {caption: 'Crafting immersive digital experiences with a blend of creativity and code.', name: 'Frontend Development', icon: Layout },
    {caption: 'Building the backbone of applications with robust and scalable server-side solutions.', name: 'Backend Development',icon: Database },
    {caption: 'Bridging the gap between front-end flair and back-end brilliance for seamless user experiences.', name: 'Full Stack Development', icon: Code2 },
    
  ];

  return (
    <>
      <style>{typingStyles}</style>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Hero Section with large title */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-white">
              Ship Faster with
            </span>
            <br />
            <span className="text-white">Full Stack Dev</span>
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl text-gray-400 text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Full Stack Developer that transforms how you work, collaborating with you to run faster.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/profile"
              className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2"
            >
              <span>Connect</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          <Link
            to="/projects"
              className="px-8 py-4 text-lg rounded-full border border-blue-500/30 text-white hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm"
          >
              View Projects
          </Link>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 bg-blue-500/5 rounded-full backdrop-blur-3xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
                x: ["0%", "100%"],
                y: ["-100%", "100%"]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
                delay: i * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Rest of your sections */}
      {/* ... */}

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

      <RatingsCarousel />
    </>
  );
}