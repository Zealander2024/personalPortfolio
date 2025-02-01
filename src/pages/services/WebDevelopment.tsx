import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Database, Shield } from 'lucide-react';
import BookingButton from '../../components/BookingButton';

export default function WebDevelopment() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
            Web Development Services
          </h1>
          <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Creating modern, responsive, and scalable web applications with cutting-edge technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
            >
              <service.icon className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Add Booking Button */}
        <div className="text-center mt-12">
          <BookingButton service="web-development" />
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces using React, Vue.js, and modern CSS frameworks.",
    icon: Layout
  },
  {
    title: "Backend Development",
    description: "Creating robust server-side applications with Node.js, Python, and various database technologies.",
    icon: Code2
  },
  {
    title: "Database Design",
    description: "Designing and implementing efficient database structures using SQL and NoSQL solutions.",
    icon: Database
  },
  {
    title: "API Development",
    description: "Building secure and scalable RESTful APIs for seamless integration.",
    icon: Shield
  }
]; 