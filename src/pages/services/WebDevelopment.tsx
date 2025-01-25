import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Database, Shield } from 'lucide-react';
import ServiceLayout from '../../components/ServiceLayout';

export default function WebDevelopment() {
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

  return (
    <ServiceLayout
      title="Web Development Services"
      description="Creating modern, responsive, and scalable web applications with cutting-edge technologies."
      backgroundClass="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
      service="web-development"
    >
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
    </ServiceLayout>
  );
} 