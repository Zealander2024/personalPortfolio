import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye, Layout, Wand2 } from 'lucide-react';

export default function UIDesign() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-pink-900 to-purple-900">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-pink-500/20"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 2, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
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
              UI/UX Design
            </h1>
            <blockquote className="text-2xl text-pink-300 italic mb-8">
              "Design is not just what it looks like, it's how it works and feels."
            </blockquote>
          </motion.div>
        </div>

        {/* Services */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {designServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-8 hover:bg-white/20 transition-all duration-300"
              >
                <service.icon className="h-12 w-12 text-pink-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 text-lg mb-6">{service.description}</p>
                <ul className="space-y-3 text-gray-300">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-2 w-2 bg-pink-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const designServices = [
  {
    title: "User Interface Design",
    description: "Creating visually stunning and intuitive interfaces.",
    icon: Palette,
    features: [
      "Visual Design Systems",
      "Interactive Prototypes",
      "Responsive Layouts",
      "Animation & Micro-interactions"
    ]
  },
  {
    title: "User Experience Design",
    description: "Crafting seamless and engaging user journeys.",
    icon: Eye,
    features: [
      "User Research",
      "Information Architecture",
      "Usability Testing",
      "User Flow Optimization"
    ]
  },
  {
    title: "Design Systems",
    description: "Building scalable and consistent design frameworks.",
    icon: Layout,
    features: [
      "Component Libraries",
      "Style Guidelines",
      "Design Documentation",
      "Pattern Libraries"
    ]
  },
  {
    title: "Interactive Design",
    description: "Creating engaging and dynamic user experiences.",
    icon: Wand2,
    features: [
      "Motion Design",
      "Interactive Prototypes",
      "Gesture Controls",
      "State Transitions"
    ]
  }
]; 