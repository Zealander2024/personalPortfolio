import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Download,
  Globe
} from 'lucide-react';

export default function CV() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Download Button */}
        <div className="flex justify-end mb-8">
          <a
            href="/john-orland-sudoy-cv.pdf"
            download
            className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </a>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
            <h1 className="text-4xl font-bold mb-2">John Orland Sudoy</h1>
            <h2 className="text-xl text-indigo-100 mb-4">Full Stack Developer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:johnorladnsudoy49@gmail.com">johnorladnsudoy49@gmail.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+63 (99) 12961716</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Baesa Jordan, Quezon City, Philippines</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                <a href="https://your-portfolio.com" target="_blank" rel="noopener noreferrer">
                  Portfolio Website
                </a>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Professional Summary */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Professional Summary</h3>
              <p className="text-gray-600 leading-relaxed">
                Full Stack Developer with expertise in modern web technologies and a passion for creating 
                innovative digital solutions. Skilled in both frontend and backend development, with a 
                strong focus on creating scalable and maintainable applications.
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Frontend Development</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>React.js & Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Framer Motion</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Backend Development</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>PostgreSQL</li>
                    <li>MongoDB</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Work Experience */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Work Experience</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Full Stack Developer</h4>
                  <p className="text-gray-600">Company Name • 2021 - Present</p>
                  <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                    <li>Developed and maintained full-stack web applications</li>
                    <li>Implemented responsive designs and modern UI components</li>
                    <li>Optimized application performance and database queries</li>
                    <li>Collaborated with cross-functional teams on various projects</li>
                  </ul>
                </div>
                {/* Add more work experiences as needed */}
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Education</h3>
              <div>
                <h4 className="text-lg font-medium text-gray-800">Bachelor of Science in Computer Science</h4>
                <p className="text-gray-600">University Name • 2017 - 2021</p>
                <p className="text-gray-600 mt-2">
                  Relevant coursework: Data Structures, Algorithms, Web Development, Database Management
                </p>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Certifications</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>AWS Certified Developer Associate</li>
                <li>MongoDB Certified Developer</li>
                <li>React Developer Certification</li>
              </ul>
            </section>

            {/* Projects */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Notable Projects</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Portfolio Website</h4>
                  <p className="text-gray-600">
                    Personal portfolio built with React, TypeScript, and Tailwind CSS, featuring 
                    modern design and animations.
                  </p>
                </div>
                {/* Add more projects as needed */}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 