import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Projects', href: '/projects' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com/yourusername',
        icon: Github,
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com/in/yourusername',
        icon: Linkedin,
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/yourusername',
        icon: Twitter,
      },
      {
        name: 'Email',
        href: 'mailto:your.email@example.com',
        icon: Mail,
      },
    ],
    services: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Mobile Development', href: '/services/mobile-development' },
      { name: 'UI/UX Design', href: '/services/ui-design' },
      { name: 'Cloud Services', href: '/services/cloud-services' }
    ],
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Portfolio
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Crafting digital experiences with precision and elegance. 
              Transforming ideas into seamless, innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm hover:text-indigo-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm hover:text-indigo-400 transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Get in Touch</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Let's collaborate on your next project.
              </p>
              <div className="flex space-x-4">
                {navigation.social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                      aria-label={item.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} John Orland Sudoy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
}
