import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  author: string;
  created_at: string;
  reading_time?: number;
  category?: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts');
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  // Memoized filtered posts based on search term and category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
      const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
      return titleMatch && categoryMatch;
    });
  }, [posts, searchTerm, selectedCategory]);

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute w-full h-full opacity-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: 'white',
                animation: `float ${Math.random() * 10 + 5}s linear infinite`
              }}
            />
          ))}
        </div>

        {/* Hexagon Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.2' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Rest of your Blog content with updated text colors */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Latest Insights & Articles
            </h1>
            <p className="text-xl text-center text-indigo-100 max-w-3xl mx-auto">
              Explore the latest trends, technologies, and insights in web development and design.
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="design">Design</option>
                <option value="devops">DevOps</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
            <Link to={`/blog/${post.id}`} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
                      {post.category && (
                        <span className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
              )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(post.created_at), 'MMM dd, yyyy')}
                        </div>
                        {post.reading_time && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.reading_time} min read
                          </div>
                        )}
                </div>
              </div>
            </Link>
                </motion.article>
              ))}
            </motion.div>
          )}

          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search term or category filter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}