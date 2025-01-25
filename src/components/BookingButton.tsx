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
      <button
        onClick={() => {
          // Your booking logic here
        }}
        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center space-x-2"
      >
        <Calendar className="h-5 w-5" />
        <span>Book Consultation</span>
      </button>

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