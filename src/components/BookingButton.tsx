import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import BookingForm from './BookingForm';

interface BookingButtonProps {
  service: string;
  className?: string;
}

export default function BookingButton({ service, className = '' }: BookingButtonProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setShowForm(true)}
        className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Calendar className="h-5 w-5 mr-2" />
        Book Now
      </motion.button>

      <AnimatePresence>
        {showForm && (
          <BookingForm
            service={service}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
} 