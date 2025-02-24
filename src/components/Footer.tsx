import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, Github, Linkedin, Star, Flag, Briefcase,
  Globe, Smartphone, Palette, Cloud, Brain, Bot, Calculator, Mail
} from 'lucide-react';
import RatingForm from './RatingForm';
import ReportForm from './ReportForm';

interface Service {
  name: string;
  path: string;
  icon: React.ElementType;
}

export default function Footer() {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);

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
                src="/logo/mylogo.png" 
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
                Let's build something amazing together
              </p>
            </div>
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
