import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  Briefcase,
  Code2,
  Cpu,
  Layout,
  Server,
  Monitor,
  Star,
  Quote,
  Sun,
  Moon
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import Typed from 'typed.js';

interface Rating {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface RatingStats {
  average: number;
  total: number;
  distribution: { [key: number]: number };
}

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingStats, setRatingStats] = useState<RatingStats>({
    average: 0,
    total: 0,
    distribution: {}
  });
  const typedRef = useRef(null);

  useEffect(() => {
    async function fetchRatings() {
      const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setRatings(data);
      }
      setLoading(false);
    }

    fetchRatings();
  }, []);

  // Calculate rating statistics
  useEffect(() => {
    if (ratings.length > 0) {
      const total = ratings.length;
      const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
      const average = sum / total;
      
      // Calculate distribution
      const distribution = ratings.reduce((acc, curr) => {
        acc[curr.rating] = (acc[curr.rating] || 0) + 1;
        return acc;
      }, {} as { [key: number]: number });

      setRatingStats({
        average,
        total,
        distribution
      });
    }
  }, [ratings]);

  // Auto-scrolling effect
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;
    const container = document.getElementById('ratings-container');
    
    if (container && ratings.length > 0) {
      scrollInterval = setInterval(() => {
        if ((container.scrollTop + container.clientHeight) >= container.scrollHeight) {
          container.scrollTop = 0;
        } else {
          container.scrollTop += 1;
        }
      }, 50);
    }

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [ratings]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        `Hi! I'm a web developer specializing in crafting fast, modern websites for small and medium businesses. Whether you're launching an online store, showcasing services, or aiming to stand out in a competitive market, I'll design a site that works for your business—not against it.

Why Partner with Me?
✅ Built for Results: Leverage my expertise in HTML5, CSS3, PHP, jQuery, JavaScript, with all (JS framework ) and SEO to create a site that's not just beautiful, but also drives traffic and conversions.
✅ Stress-Free Process: From brainstorming to launch, I handle everything—timelines, tech setups, and troubleshooting—so you can focus on what you do best.
✅ Collaboration First: I prioritize regular updates and open communication. You'll never wonder, "What's next?"—we'll tackle every milestone together.

Let's build a website that grows your business, impresses your audience, and reflects your unique brand. Ready to get started? Let's discuss your vision!`
      ],
      typeSpeed: 20, // Slow typing speed
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
      preStringTyped: () => {
        const element = typedRef.current;
        if (element && element instanceof HTMLElement) {
          element.style.whiteSpace = 'pre-wrap';
        }
      }
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const skills = [
    { title: 'Internet of Things', icon: Cpu },
    { title: 'Frontend Development', icon: Layout },
    { title: 'Desktop Applications', icon: Monitor },
    { title: 'Arduino Programming', icon: Server },
    { title: 'Full Stack Development', icon: Code2 },
    { title: 'Prototyping', icon: Code2 }
  ];

  return (
    <div className={`min-h-screen py-16 px-4 transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-gray-100 via-indigo-100 to-gray-100' 
        : 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          className={`fixed top-24 right-4 p-3 rounded-full ${
            theme === 'light'
              ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
              : 'bg-indigo-900 text-indigo-300 hover:bg-indigo-800'
          } transition-colors duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </motion.button>

        {/* Profile Header */}
        <div className="text-center mb-12">
          {/* Profile Image */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <img
              src="/JohnOrlandSudoy.png"
              alt="John Orland Sudoy"
              className="rounded-full w-full h-full object-cover shadow-2xl border-4 border-indigo-500"
            />
          </div>

          {/* Name and Title */}
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            John Orland Sudoy
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-indigo-200'
          }`}>
            IT | Internet of Things Expertise | Frontend Developer | Desktop App Developer | 
            Arduino programmer | Prototyping | Full Stack Developer
          </p>
        </div>

        {/* Auto-typing Introduction */}
        <div className={`mb-16 mt-12 mx-auto max-w-4xl ${
          theme === 'light' 
            ? 'bg-white/80 shadow-lg' 
            : 'bg-white/10 backdrop-blur-md'
        } rounded-lg p-8`}>
          <div 
            ref={typedRef}
            className={`text-lg leading-relaxed ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-200'
            } whitespace-pre-wrap`}
          />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className={`${
                theme === 'light'
                  ? 'bg-white/80 shadow-lg hover:shadow-xl'
                  : 'bg-white/10 backdrop-blur-lg'
              } rounded-lg p-6 flex items-center space-x-4 transition-all duration-300`}
            >
              <skill.icon className={`h-8 w-8 ${
                theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'
              }`} />
              <span className={`font-medium ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {skill.title}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="/john-orland-sudoy-cv.pdf"
            download
            className={`inline-flex items-center px-6 py-3 rounded-full ${
              theme === 'light'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            } transition-colors`}
          >
            <Download className="h-5 w-5 mr-2" />
            Download Resume
          </a>
          
          <Link
            to="/contact"
            className={`inline-flex items-center px-6 py-3 rounded-full ${
              theme === 'light'
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                : 'bg-white/10 text-white hover:bg-white/20'
            } transition-colors`}
          >
            <Mail className="h-5 w-5 mr-2" />
            Contact Me
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-10">
          <a
            href="https://github.com/Zealander2024"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/john-orland-sudoy-75580a31b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://www.upwork.com/freelancers/~01a08f931b07ce5c14?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            <Briefcase className="h-6 w-6" />
          </a>
        </div>

        {/* Ratings Section */}
        <div className="relative py-12 sm:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Client Ratings
              </h2>
              <div className="mt-4 flex flex-wrap justify-center items-center gap-4">
                <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  {ratingStats.average.toFixed(1)}
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${
                        i < Math.round(ratingStats.average)
                          ? 'fill-yellow-400 text-yellow-400 drop-shadow-glow'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-gray-400">
                  ({ratingStats.total} reviews)
                </div>
              </div>
            </div>

            {/* Auto-scrolling ratings container */}
            <div className="overflow-hidden h-[400px] sm:h-[500px] lg:h-[600px] relative">
              <motion.div
                className="flex flex-wrap gap-4 sm:gap-6 absolute w-full"
                animate={{
                  y: [0, -2000]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 40,
                  ease: "linear",
                  repeatType: "loop"
                }}
                whileHover={{ animationPlayState: 'paused' }}
              >
                {[...ratings, ...ratings, ...ratings, ...ratings].map((rating, index) => (
                  <motion.div
                    key={`${rating.id}-${index}`}
                    className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] backdrop-blur-md bg-gradient-to-br from-gray-800/30 via-gray-900/30 to-gray-800/30 rounded-xl p-4 sm:p-6 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/10 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Quote icon */}
                    <Quote className="absolute top-3 sm:top-4 right-3 sm:right-4 h-6 w-6 sm:h-8 sm:w-8 text-indigo-400/20 group-hover:text-indigo-400/30 transition-colors" />

                    {/* Rating stars */}
                    <div className="flex items-center mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            i < rating.rating
                              ? 'fill-yellow-400 text-yellow-400 drop-shadow-glow'
                              : 'text-gray-400/50'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-sm sm:text-base text-gray-300/90 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                      "{rating.comment}"
                    </p>

                    {/* Client info */}
                    <div className="flex items-center space-x-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-600/80 backdrop-blur-sm flex items-center justify-center text-white text-sm sm:text-base font-medium shadow-lg">
                        {rating.name.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-medium text-white/90 text-sm sm:text-base">
                          {rating.name}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400/80">
                          {new Date(rating.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Gradient overlays */}
              <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-gray-900 via-gray-900/90 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 