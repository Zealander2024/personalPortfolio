import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code2, Menu, X } from 'lucide-react';
import './styles.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  if (user) {
    navigation.push({ name: 'Admin', href: '/admin' });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Portfolio</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.href)
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => signOut()}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}