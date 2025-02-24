import React, { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface Rating {
  id: string;
  name: string;
  rating: number;
  caption: string;
  created_at: string;
}

export default function ProfileRatings() {
  const [ratings, setRatings] = useState<Rating[]>([]);
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
      <div className="flex items-center justify-center min-h-[300px] bg-[#00172D]">
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
      <div className="flex items-center justify-center min-h-[300px] bg-[#00172D] text-red-400">
        Error loading ratings: {error}
      </div>
    );
  }

  if (ratings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-[#00172D] text-gray-400">
        No ratings available yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {ratings.map((rating, index) => (
          <motion.div
            key={rating.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < rating.rating 
                      ? 'fill-yellow-400 text-yellow-400 drop-shadow-glow' 
                      : 'text-gray-400/50'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-300/90 mb-4 leading-relaxed">
              "{rating.caption}"
            </p>
            <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/80 to-indigo-600/80 flex items-center justify-center text-white font-medium">
                {rating.name.charAt(0)}
              </div>
              <div>
                <span className="block font-medium text-white/90">
                  {rating.name}
                </span>
                <span className="text-sm text-gray-400/80">
                  {new Date(rating.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 