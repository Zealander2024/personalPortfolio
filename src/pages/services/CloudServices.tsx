import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Server, Lock, BarChart } from 'lucide-react';
import BookingButton from '../../components/BookingButton';

export default function CloudServices() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-20, 0, 20]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Cloud className="text-blue-500/20 h-16 w-16" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Cloud Services
            </h1>
            <blockquote className="text-2xl text-blue-300 italic mb-8">
              "Elevate your infrastructure to new heights with scalable cloud solutions."
            </blockquote>
          </motion.div>
        </div>

        {/* Services */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {cloudServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-8 hover:bg-white/20 transition-all duration-300"
              >
                <service.icon className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 text-lg mb-6">{service.description}</p>
                <ul className="space-y-3 text-gray-300">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-2 w-2 bg-blue-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Add Booking Button */}
          <div className="text-center mt-12">
            <BookingButton service="cloud-services" />
          </div>
        </div>
      </div>
    </div>
  );
}

const cloudServices = [
  {
    title: "Cloud Infrastructure",
    description: "Building and managing scalable cloud environments.",
    icon: Cloud,
    features: [
      "AWS/Azure/GCP Setup",
      "Infrastructure as Code",
      "Auto-scaling Solutions",
      "Cloud Migration"
    ]
  },
  {
    title: "Server Management",
    description: "Optimizing and maintaining cloud servers.",
    icon: Server,
    features: [
      "Server Configuration",
      "Performance Monitoring",
      "Load Balancing",
      "Backup Solutions"
    ]
  },
  {
    title: "Security & Compliance",
    description: "Implementing robust security measures.",
    icon: Lock,
    features: [
      "Security Protocols",
      "Compliance Standards",
      "Data Encryption",
      "Access Control"
    ]
  },
  {
    title: "Performance Analytics",
    description: "Monitoring and optimizing cloud performance.",
    icon: BarChart,
    features: [
      "Resource Monitoring",
      "Cost Optimization",
      "Performance Metrics",
      "Usage Analytics"
    ]
  }
]; 