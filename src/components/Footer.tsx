import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, Github, Linkedin, Star, Flag, Briefcase,
  Globe, Smartphone, Palette, Cloud, Brain, Bot, Calculator, Mail, Loader
} from 'lucide-react';
import RatingForm from './RatingForm';
import ReportForm from './ReportForm';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

interface Service {
  name: string;
  path: string;
  icon: React.ElementType;
}

export default function Footer() {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services: Service[] = [
    { name: 'Web Development', path: '/services/web-development', icon: Globe },
    { name: 'Mobile Development', path: '/services/mobile-development', icon: Smartphone },
    { name: 'UI/UX Design', path: '/services/ui-design', icon: Palette },
    { name: 'Cloud Services', path: '/services/cloud-services', icon: Cloud },
    { name: 'MATLAB Development', path: '/services/matlab-development', icon: Calculator },
    { name: 'Robotics', path: '/services/robotics', icon: Bot },
    { name: 'AI Model Training', path: '/services/ai-model-trainer', icon: Brain }
  ];

  useEffect(() => {
    // Animate services in after component mounts
    const timer = setTimeout(() => {
      setIsServicesVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (subscribeStatus === 'success') {
      timeoutId = setTimeout(() => {
        setSubscribeStatus('idle');
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [subscribeStatus]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubscribeStatus('idle');

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email }]);

      if (error) throw error;
      
      setSubscribeStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscribeStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#00172D] text-gray-300">
      {/* Animated gradient divider */}
      <div className="relative h-[2px] overflow-hidden">
        {/* Base line */}
        <div className="absolute inset-0 bg-blue-900/30" />
        
        {/* Animated flashing lines */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-flash-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0" />
          <div className="absolute inset-0 animate-flash-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0" />
          <div className="absolute inset-0 animate-flash-3 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-0" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Updated Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src="/mylogo.png" 
                alt="John Orland Logo" 
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform duration-300 group-hover:scale-110" 
              />
            </Link>
            <p className="text-sm text-gray-400">
              Crafting innovative digital solutions with passion and precision.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Zealander2024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/john-orland-sudoy-75580a31b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.upwork.com/freelancers/~01a08f931b07ce5c14"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Briefcase className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Updated Services Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/web-development" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Web Development</span>
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-development" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile Development</span>
                </Link>
              </li>
              <li>
                <Link to="/services/ui-design" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>UI/UX Design</span>
                </Link>
              </li>
              <li>
                <Link to="/services/cloud-services" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  <span>Cloud Services</span>
                </Link>
              </li>
              <li>
                <Link to="/services/matlab-development" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span>MATLAB Development</span>
                </Link>
              </li>
              <li>
                <Link to="/services/robotics" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span>Robotics</span>
                </Link>
              </li>
              <li>
                <Link to="/services/ai-model-trainer" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>AI Model Training</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Updated Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:johnorlandsudoy49@gmail.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm break-all">johnorlandsudoy49@gmail.com</span>
              </a>
              <p className="text-gray-400">
                Available for freelance opportunities
              </p>
              <p className="text-gray-400 text-sm">
                Let's build something amazing together1
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-blue-900/30 mt-5">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Connected
            </h3>
            <p className="text-gray-400 mb-8">
              Subscribe to receive updates about new projects and tech insights.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <img 
                      src="/loading/logif.gif" 
                      alt="Loading..." 
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            {/* Status Messages */}
            {subscribeStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="mt-8 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl" />
                <motion.div 
                  className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
                  >
                    <svg 
                      className="w-8 h-8 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </svg>
                  </motion.div>
                  
                  <motion.h4
                    className="text-xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Successfully Subscribed!
                  </motion.h4>
                  
                  <motion.p
                    className="text-gray-400 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Thank you for joining our community. You'll receive updates about new projects and insights.
                  </motion.p>

                  <motion.div
                    className="flex justify-center space-x-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-2xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.7 + i * 0.1,
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }}
                      >
                        🎉
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
            {subscribeStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-red-500/10 backdrop-blur-sm rounded-xl p-4 border border-red-500/20"
              >
                <p className="text-red-400">
                  Oops! Something went wrong. Please try again.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-900/30">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} John Orland. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <RatingForm isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} />
      <ReportForm isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </footer>
  );
}
