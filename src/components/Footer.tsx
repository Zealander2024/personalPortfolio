import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Linkedin, Twitter, Star, Flag } from 'lucide-react';
import RatingForm from './RatingForm';
import ReportForm from './ReportForm';

export default function Footer() {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
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

          {/* Quick Links */}
          <div>
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

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Connect
            </h3>
            <div className="mt-4 flex space-x-4">
              <a href="https://github.com/Zealander2024" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/john-orland-sudoy-75580a31b/" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Move buttons before the copyright section */}
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
