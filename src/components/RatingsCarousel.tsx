import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface Rating {
  id: string;
  name: string;
  rating: number;
  caption: string;
  created_at: string;
}

export default function RatingsCarousel() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setRatings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#00172D]">
        <img 
          src="/loading/logif.gif" 
          alt="Loading..."
          className="w-16 h-16 object-contain"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#00172D] text-red-400">
        Error loading ratings: {error}
      </div>
    );
  }

  if (ratings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#00172D] text-gray-400">
        No ratings available yet.
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white"
        >
          What Our Clients Say
        </motion.h2>
        
        {/* Scrolling container */}
        <div 
          className="overflow-hidden h-[400px] sm:h-[500px] relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 absolute w-full"
            animate={isPaused ? { y: 0 } : { 
              y: [0, -1000]
            }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {[...ratings, ...ratings, ...ratings].map((rating, index) => (
              <motion.div
                key={`${rating.id}-${index}`}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] backdrop-blur-md bg-gradient-to-br from-gray-800/30 via-gray-900/30 to-gray-800/30 rounded-xl p-4 sm:p-6 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/10 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        i < rating.rating 
                          ? 'fill-yellow-400 text-yellow-400 drop-shadow-glow' 
                          : 'text-gray-400/50'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-300/90 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                  "{rating.caption}"
                </p>
                <div className="flex items-center space-x-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-600/80 backdrop-blur-sm flex items-center justify-center text-white text-sm sm:text-base font-medium shadow-lg">
                    {rating.name.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-medium text-white/90 text-sm sm:text-base">
                      {rating.name}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400/80">
                      {new Date(rating.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-gray-900 via-gray-900/90 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent z-10" />
        </div>
      </div>
    </div>
  );
}