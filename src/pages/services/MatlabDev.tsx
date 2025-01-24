import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BarChart as ChartBar, Calculator, Cpu } from 'lucide-react';
import BookingButton from '../../components/BookingButton';

export default function MatlabDev() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900">
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
              <Calculator className="text-blue-500/20 h-16 w-16" />
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
              MATLAB Development
            </h1>
            <blockquote className="text-2xl text-cyan-300 italic mb-8">
              "Transforming complex mathematical concepts into powerful solutions."
            </blockquote>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {matlabServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-8"
              >
                <service.icon className="h-12 w-12 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 text-lg mb-6">{service.description}</p>
                <ul className="space-y-3 text-gray-300">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-2 w-2 bg-cyan-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Add Booking Button */}
          <div className="text-center mt-12">
            <BookingButton service="matlab-consultation" />
          </div>
        </div>
      </div>
    </div>
  );
}

const matlabServices = [
  {
    title: "Algorithm Development",
    description: "Creating efficient MATLAB algorithms for complex computations.",
    icon: Code2,
    features: [
      "Numerical Analysis",
      "Signal Processing",
      "Optimization Algorithms",
      "Custom Function Development"
    ]
  },
  {
    title: "Data Analysis",
    description: "Advanced data analysis and visualization solutions.",
    icon: ChartBar,
    features: [
      "Statistical Analysis",
      "Data Visualization",
      "Pattern Recognition",
      "Time Series Analysis"
    ]
  },
  {
    title: "Scientific Computing",
    description: "Solving complex scientific and engineering problems.",
    icon: Calculator,
    features: [
      "Mathematical Modeling",
      "Simulation Development",
      "Research Support",
      "Technical Computing"
    ]
  },
  {
    title: "System Integration",
    description: "Integrating MATLAB with other systems and platforms.",
    icon: Cpu,
    features: [
      "API Development",
      "Hardware Integration",
      "Real-time Systems",
      "Automation Solutions"
    ]
  }
]; 