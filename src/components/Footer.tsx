import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white shadow-lg mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a href="https://github.com/Zealander2024" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://ph.linkedin.com/in/john-orland-sudoy-75580a31b" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:johnorlandsudoy49@gmail.com" className="text-gray-500 hover:text-gray-700">
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <div className="flex space-x-6 mt-4">
            <a href="https://dynamic-gaufre-67adef.netlify.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              Reports
            </a>
            <a href="https://dynamic-gaufre-67adef.netlify.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              Ratings
            </a>
             <a href="https://orlando-mauve.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              More..
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} John Orland Sudoy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
