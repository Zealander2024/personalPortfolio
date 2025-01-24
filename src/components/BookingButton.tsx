import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface BookingButtonProps {
  service?: string;
  className?: string;
}

export default function BookingButton({ service, className = '' }: BookingButtonProps) {
  const handleBooking = () => {
    // You can customize this to integrate with your booking system
    window.location.href = `https://calendly.com/your-username/${service || 'consultation'}`;
  };

  return (
    <motion.button
      onClick={handleBooking}
      className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Calendar className="h-5 w-5 mr-2" />
      Book Now
    </motion.button>
  );
} 