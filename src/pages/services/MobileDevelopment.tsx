import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Layers, Zap, Shield } from 'lucide-react';
import BookingButton from '../../components/BookingButton';

export default function MobileDevelopment() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
              style={{
                top: `${i * 5}%`,
                left: '-100%',
                right: '-100%',
                animation: `slideRight ${Math.random() * 5 + 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
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
              Mobile Development
            </h1>
            <blockquote className="text-2xl text-purple-300 italic mb-8">
              "In the palm of your hand lies infinite possibilities, waiting to be unlocked."
            </blockquote>
          </motion.div>
        </div>

        {/* Services */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {mobileServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-8"
              >
                <service.icon className="h-12 w-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 text-lg mb-6">{service.description}</p>
                <ul className="space-y-3 text-gray-300">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-2 w-2 bg-purple-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Add Booking Button */}
          <div className="text-center mt-12">
            <BookingButton service="mobile-development" />
          </div>
        </div>
      </div>
    </div>
  );
}

const mobileServices = [
  {
    title: "Native Development",
    description: "Building high-performance native mobile applications.",
    icon: Smartphone,
    features: [
      "iOS Development",
      "Android Development",
      "Performance Optimization",
      "Native Features Integration"
    ]
  },
  {
    title: "Cross-Platform Solutions",
    description: "Creating efficient multi-platform applications.",
    icon: Layers,
    features: [
      "React Native Development",
      "Flutter Applications",
      "Code Reusability",
      "Consistent UI/UX"
    ]
  },
  {
    title: "App Performance",
    description: "Optimizing for speed and efficiency.",
    icon: Zap,
    features: [
      "Load Time Optimization",
      "Memory Management",
      "Battery Efficiency",
      "Smooth Animations"
    ]
  },
  {
    title: "Security & Testing",
    description: "Ensuring robust and secure applications.",
    icon: Shield,
    features: [
      "Security Best Practices",
      "Automated Testing",
      "Quality Assurance",
      "Regular Updates"
    ]
  }
]; 