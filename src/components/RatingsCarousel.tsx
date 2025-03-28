import React, { useEffect, useState, useRef } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface Rating {
  id: string;
  name: string;
  rating: number;
  caption: string;
  created_at: string;
}

interface RatingCardProps {
  rating: Rating;
  index: number;
}

// Add a new RatingCard component for better organization
const RatingCard: React.FC<RatingCardProps> = ({ rating, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  return (
    <motion.div
      className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] backdrop-blur-md bg-gradient-to-br from-gray-800/30 via-gray-900/30 to-gray-800/30 rounded-xl p-4 sm:p-6 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/10 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Stars Rating */}
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

      {/* Caption with Read More functionality */}
      <div className="relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={false}
            animate={{ height: isExpanded ? 'auto' : '4.5rem' }}
            className="relative overflow-hidden"
          >
            <p 
              ref={textRef}
              className={`text-sm sm:text-base text-gray-300/90 leading-relaxed ${
                !isExpanded ? 'line-clamp-3' : ''
              }`}
            >
              "{rating.caption}"
            </p>
          </motion.div>
        </AnimatePresence>

        {rating.caption.length > 150 && ( // Show button if text is longer than 150 characters
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-medium group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{isExpanded ? 'Show less' : 'Read more'}</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 group-hover:transform group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="h-4 w-4 group-hover:transform group-hover:translate-y-0.5 transition-transform" />
            )}
          </motion.button>
        )}

        {/* Gradient fade for collapsed state */}
        {!isExpanded && rating.caption.length > 150 && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none" />
        )}
      </div>

      {/* User Info */}
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
  );
};

// Create a reusable rating card for profile page
export const ProfileRatingCard: React.FC<RatingCardProps> = ({ rating, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="w-full backdrop-blur-md bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Stars and content similar to RatingCard but with different styling */}
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating.rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-400/50'
            }`}
          />
        ))}
      </div>

      <div className="relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={false}
            animate={{ height: isExpanded ? 'auto' : '4.5rem' }}
            className="relative overflow-hidden"
          >
            <p className={`text-gray-300/90 ${!isExpanded ? 'line-clamp-3' : ''}`}>
              "{rating.caption}"
            </p>
          </motion.div>
        </AnimatePresence>

        {rating.caption.length > 150 && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-medium group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{isExpanded ? 'Show less' : 'Read more'}</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 group-hover:transform group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="h-4 w-4 group-hover:transform group-hover:translate-y-0.5 transition-transform" />
            )}
          </motion.button>
        )}

        {!isExpanded && rating.caption.length > 150 && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none" />
        )}
      </div>

      <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-white/10">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/80 to-purple-600/80 flex items-center justify-center text-white font-medium">
          {rating.name.charAt(0)}
        </div>
        <div>
          <span className="block font-medium text-white/90">{rating.name}</span>
          <span className="text-sm text-gray-400/80">
            {new Date(rating.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Main RatingsCarousel component
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
            animate={isPaused ? { y: 0 } : { y: [0, -1000] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {[...ratings, ...ratings, ...ratings].map((rating, index) => (
              <RatingCard 
                key={`${rating.id}-${index}`}
                rating={rating}
                index={index}
              />
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