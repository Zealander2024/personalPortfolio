import React, { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

interface Rating {
  id: string;
  name: string;
  rating: number;
  caption: string;
  created_at: string;
}

export default function RatingsCarousel() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRatings();
    const interval = setInterval(scroll, 3000); // Auto scroll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchRatings = async () => {
    const { data } = await supabase
      .from('ratings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setRatings(data);
  };

  const scroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.scrollLeft + container.offsetWidth;
      
      if (scrollAmount >= container.scrollWidth) {
        // Reset to start if we've reached the end
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (ratings.length === 0) return null;

  return (
    <div className="bg-gray-50 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        
        <div
          ref={containerRef}
          className="flex overflow-x-hidden space-x-6 pb-4"
        >
          {ratings.map((rating) => (
            <motion.div
              key={rating.id}
              className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < rating.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{rating.caption}</p>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{rating.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(rating.created_at).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 