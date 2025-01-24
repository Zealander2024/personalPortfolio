import React from 'react';
import { motion } from 'framer-motion';
import { Bot as Robot, Cog, Cpu, Zap } from 'lucide-react';
import BookingButton from '../../components/BookingButton';

export default function Robotics() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-teal-900">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
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
              <Robot className="text-green-500/20 h-16 w-16" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Robotics Solutions
            </h1>
            <blockquote className="text-2xl text-teal-300 italic mb-8">
              "Automating the future through innovative robotics engineering."
            </blockquote>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {roboticsServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-8"
              >
                <service.icon className="h-12 w-12 text-teal-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 text-lg mb-6">{service.description}</p>
                <ul className="space-y-3 text-gray-300">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-2 w-2 bg-teal-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Booking Button */}
          <div className="text-center mt-12">
            <BookingButton service="robotics-consultation" />
          </div>
        </div>
      </div>
    </div>
  );
}

const roboticsServices = [
  {
    title: "Robot Programming",
    description: "Programming and control of robotic systems.",
    icon: Robot,
    features: [
      "Motion Control",
      "Path Planning",
      "Sensor Integration",
      "Robot Operating System (ROS)"
    ]
  },
  {
    title: "Automation Solutions",
    description: "Custom automation solutions for industry.",
    icon: Cog,
    features: [
      "Industrial Automation",
      "Process Optimization",
      "Quality Control",
      "Production Efficiency"
    ]
  },
  {
    title: "System Integration",
    description: "Integrating robotics with existing systems.",
    icon: Cpu,
    features: [
      "Hardware Integration",
      "Software Integration",
      "Network Configuration",
      "Safety Systems"
    ]
  },
  {
    title: "Performance Optimization",
    description: "Optimizing robotic system performance.",
    icon: Zap,
    features: [
      "Speed Optimization",
      "Precision Tuning",
      "Energy Efficiency",
      "Maintenance Planning"
    ]
  }
]; 