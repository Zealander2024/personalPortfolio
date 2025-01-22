import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { ArrowRight, Code2, Database, Layout, Server, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [
        'John Orland',
        'Full Stack Developer',
        'UI/UX Designer',
        'Problem Solver'
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      backDelay: 1500
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
    <motion.div
      className="min-h-screen relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      style={{
        background: 'linear-gradient(45deg, #0f172a, #1e293b, #0f172a)',
        backgroundSize: '400% 400%'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-10 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                background: 'white',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hexagon Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.2' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}/>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-4">
              Welcome, I'm{' '}
              <span ref={el} className="inline-block min-h-[1.5em]"></span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto">
              Crafting innovative digital solutions with cutting-edge technology and elegant design
            </p>
          </motion.div>

          {/* Floating Tech Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            {[
              { icon: Layout, title: "Frontend Development", desc: "Creating beautiful, responsive interfaces" },
              { icon: Server, title: "Backend Development", desc: "Building robust server architectures" },
              { icon: Database, title: "Database Design", desc: "Optimizing data structures" },
              { icon: Code2, title: "Clean Code", desc: "Writing maintainable, efficient code" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={floatingIconVariants}
                animate="animate"
                className="p-6 rounded-xl bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <item.icon className="h-10 w-10 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button - Updated to Download CV */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 mb-8 flex justify-center gap-4"
          >
            <Link
              to="/cv"
              className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              View CV
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="/john-orland-sudoy-cv.pdf"
              download
              className="inline-flex items-center px-8 py-3 rounded-full border-2 border-indigo-500 text-indigo-500 font-medium hover:bg-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Download CV
              <ArrowDown className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{skill.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                 {skill.caption} 
                </p>
              </div>
            );
          })}
        </div>

        {/* Featured Projects */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">Featured Projects</h2>
            <Link
              to="/projects"
              className="flex items-center text-white hover:text-indigo-700 text-sm sm:text-base"
            >
              View all projects
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Project cards will be dynamically loaded here */}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-600 rounded-lg p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Let's work together
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <Link
            to="/contact"
            className="m-3 inline-block bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors text-sm sm:text-base"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </motion.div>
  );
}