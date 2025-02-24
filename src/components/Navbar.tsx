import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code2, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Profile', href: '/profile' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    {
      name: 'Services',
      href: '#',
      dropdownItems: [
        { name: 'Web Development', href: '/services/web-development' },
        { name: 'Mobile Development', href: '/services/mobile-development' },
        { name: 'UI/UX Design', href: '/services/ui-design' },
        { name: 'Cloud Services', href: '/services/cloud-services' },
        { name: 'MATLAB Development', href: '/services/matlab-development' },
        { name: 'Robotics', href: '/services/robotics' },
        { name: 'AI Model Training', href: '/services/ai-model-trainer' }
      ]
    }
  ];

  if (user) {
    navigation.push({ name: 'Admin', href: '/admin' });
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (location.pathname === href) {
      scrollToTop();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderDesktopMenuItem = (item: any) => {
    const linkStyles = isScrolled
      ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-500/10'
      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100';

    if (item.dropdownItems) {
      return (
        <div key={item.name} className="relative" ref={dropdownRef}>
          <button
            onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
            className={`px-3 py-2 rounded-md text-sm font-medium inline-flex items-center ${
              activeDropdown === item.name
                ? isScrolled ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-100 text-blue-600'
                : linkStyles
            }`}
          >
            {item.name}
            <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${
              activeDropdown === item.name ? 'rotate-180' : ''
            }`} />
          </button>

          {activeDropdown === item.name && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#00172D] ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu">
                {item.dropdownItems.map((dropdownItem: any) => (
                  <Link
                    key={dropdownItem.name}
                    to={dropdownItem.href}
                    onClick={() => {
                      setActiveDropdown(null);
                      handleNavClick(dropdownItem.href);
                    }}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-blue-500/10 hover:text-blue-400"
                    role="menuitem"
                  >
                    {dropdownItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.href}
        onClick={() => handleNavClick(item.href)}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          isActive(item.href)
            ? isScrolled ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-100 text-blue-600'
            : linkStyles
        }`}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#00172D] shadow-lg backdrop-blur-lg bg-opacity-90' 
          : 'bg-white/80 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <img 
              src="/logo/mylogo.png" 
              alt="John Orland Logo" 
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain transition-transform duration-300 group-hover:scale-110" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map(item => renderDesktopMenuItem(item))}
            {user && (
              <button
                onClick={() => signOut()}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isScrolled
                    ? 'text-gray-200 hover:bg-blue-500/10'
                    : 'text-gray-700 hover:bg-gray-100'
                } transition-colors duration-200`}
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${
                isScrolled ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#00172D] shadow-lg backdrop-blur-lg"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigation.map(item => (
                <div key={item.name}>
                  {item.dropdownItems ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className="w-full text-left px-4 py-2 text-base font-medium text-gray-200 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg flex justify-between items-center"
                      >
                        {item.name}
                        <ChevronDown className={`h-4 w-4 transform transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              onClick={() => {
                                setIsOpen(false);
                                setActiveDropdown(null);
                                handleNavClick(dropdownItem.href);
                              }}
                              className="block px-4 py-2 text-sm font-medium text-gray-200 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        handleNavClick(item.href);
                      }}
                      className={`block px-4 py-2 text-base font-medium rounded-lg ${
                        isActive(item.href)
                          ? isScrolled ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-100 text-blue-600'
                          : linkStyles
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}