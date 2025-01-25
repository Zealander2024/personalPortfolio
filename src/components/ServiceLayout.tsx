import React from 'react';
import { motion } from 'framer-motion';
import BookingButton from './BookingButton';

interface ServiceLayoutProps {
  title: string;
  description: string;
  backgroundClass: string;
  children: React.ReactNode;
  service: string;
}

export default function ServiceLayout({
  title,
  description,
  backgroundClass,
  children,
  service
}: ServiceLayoutProps) {
  return (
    <div className={`min-h-screen relative overflow-hidden ${backgroundClass}`}>
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>
        </div>

        {/* Service Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {children}
          </div>
          
          {/* Booking Button */}
          <div className="text-center mt-12">
            <BookingButton service={service} />
          </div>
        </div>
      </div>
    </div>
  );
} 