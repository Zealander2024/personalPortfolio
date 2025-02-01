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
        const element = typedRef.current as HTMLElement;
        if (element) {
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
              src="https://media.licdn.com/dms/image/v2/D4E03AQHK0mjt1L2cNw/profile-displayphoto-shrink_200_200/B4EZS7d0eDHgAY-/0/1738311944779?e=1743638400&v=beta&t=TpYQqesDy3L5O2UU32_H9fre4_fb-EmdxVErkO9FuUk"
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
        <div className="flex justify-center space-x-6">
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
        <div className="mt-20">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Client Testimonials
          </h2>

          {/* Rating Statistics */}
          {!loading && ratings.length > 0 && (
            <div className="mb-8">
              <div className={`${
                theme === 'light'
                  ? 'bg-white/80 shadow-lg'
                  : 'bg-white/10 backdrop-blur-md'
              } rounded-lg p-6 max-w-2xl mx-auto`}>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-white mb-1">
                      {ratingStats.average.toFixed(1)}
                    </h3>
                    <p className="text-indigo-300">Average Rating</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-white mb-1">
                      {ratingStats.total}
                    </h3>
                    <p className="text-indigo-300">Total Reviews</p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingStats.distribution[star] || 0;
                    const percentage = (count / ratingStats.total) * 100;
                    return (
                      <div key={star} className="flex items-center">
                        <div className="flex items-center w-20">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                          <span className="text-sm text-gray-300">{star}</span>
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-indigo-500"
                            />
                          </div>
                        </div>
                        <div className="w-20 text-right">
                          <span className="text-sm text-gray-300">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          <div className="relative">
            {/* Glass effect background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-xl" />

            {/* Scrolling ratings container */}
            <div 
              id="ratings-container"
              className="relative max-h-[500px] overflow-y-auto custom-scrollbar scroll-smooth"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {ratings.map((rating, index) => (
                  <motion.div
                    key={rating.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${
                      theme === 'light'
                        ? 'bg-white/80 shadow-lg hover:shadow-xl'
                        : 'bg-white/10 backdrop-blur-md'
                    } rounded-lg p-6 relative overflow-hidden group hover:bg-white/15 transition-all duration-300`}
                  >
                    {/* Quote icon */}
                    <Quote className="absolute top-4 right-4 h-8 w-8 text-indigo-400/20 group-hover:text-indigo-400/30 transition-colors" />

                    {/* Rating stars */}
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < rating.rating
                              ? 'text-yellow-400'
                              : 'text-gray-400'
                          }`}
                          fill={i < rating.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-200 mb-4 italic">
                      "{rating.comment}"
                    </p>

                    {/* Client name and date */}
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-300 font-medium">
                        {rating.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {new Date(rating.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 