import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, Github, Linkedin, Star, Flag, Briefcase,
  Globe, Smartphone, Palette, Cloud, Brain, Bot, Calculator
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
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-3">
            <Link to="/" className="flex items-center">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                orlanDev.com
              </span>
            </Link>
            <p className="mt-4 text-gray-500 text-sm">
              Transforming ideas into elegant digital solutions. Full-stack development, UI/UX design, and innovative tech solutions.
            </p>
          </div>

          {/* Services - Updated Layout */}
          <div className="col-span-1 md:col-span-5">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Our Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {services.map((service, index) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className={`group flex items-center text-gray-500 hover:text-indigo-600 transition-all duration-300 ${
                    isServicesVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    transitionProperty: 'all'
                  }}
                >
                  <div className="flex items-center w-full">
                    <service.icon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{service.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/projects" className="text-gray-500 hover:text-indigo-600">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-500 hover:text-indigo-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-indigo-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Connect
            </h3>
            <div className="mt-4 flex flex-col space-y-2">
              <a 
                href="https://github.com/Zealander2024" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-500"
              >
                <Github className="h-6 w-6 mr-2" />
                <span>GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/john-orland-sudoy-75580a31b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-500"
              >
                <Linkedin className="h-6 w-6 mr-2" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://www.upwork.com/freelancers/~01a08f931b07ce5c14?mp_source=share" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-green-500 hover:text-green-600"
              >
                <Briefcase className="h-6 w-6 mr-2" />
                <span>Upwork Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Rating and Report Buttons */}
        <div className="flex justify-center space-x-6 mt-12 mb-8">
          <button
            onClick={() => setIsRatingOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors duration-200 shadow-sm"
          >
            <Star className="h-5 w-5" />
            <span className="font-medium">Rate Our Services</span>
          </button>
          <button
            onClick={() => setIsReportOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
          >
            <Flag className="h-5 w-5" />
            <span className="font-medium">Report an Issue</span>
          </button>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} OrlanDev.com. All rights reserved.
          </p>
        </div>

        <RatingForm isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} />
        <ReportForm isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      </div>
    </footer>
  );
}
