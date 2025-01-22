import React from 'react';
import { ArrowRight, Code, Database, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const skills = [
    {caption: 'Crafting immersive digital experiences with a blend of creativity and code.', name: 'Frontend Development', icon: Layout },
    {caption: 'Building the backbone of applications with robust and scalable server-side solutions.', name: 'Backend Development',icon: Database },
    {caption: 'Bridging the gap between front-end flair and back-end brilliance for seamless user experiences.', name: 'Full Stack Development', icon: Code },
    
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Full Stack Developer
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Building beautiful, scalable, and user-friendly applications with modern technologies.
        </p>
      </div>

      {/* Skills Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{skill.name}</h3>
              <p className="text-gray-600 text-sm sm:text-base">
               {skill.caption} 
              </p>
            </div>
          );
        })}
      </div>

      {/* Featured Projects */}
      <div className="mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Featured Projects</h2>
          <Link
            to="/projects"
            className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm sm:text-base"
          >
            View all projects
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Project cards will be dynamically loaded here */}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 rounded-lg p-6 sm:p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Let's work together
        </h2>
        <p className="text-indigo-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
          I'm always interested in hearing about new projects and opportunities.
        </p>
        <Link
          to="/contact"
          className="m-3 inline-block bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors text-sm sm:text-base"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}