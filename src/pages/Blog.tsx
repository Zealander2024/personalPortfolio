import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Blog</h1>
      <div className="grid gap-6 sm:gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/blog/${post.id}`} className="block">
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 sm:h-64 object-cover"
                />
              )}
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-500 mb-3 block">
                  {format(new Date(post.created_at), 'MMMM d, yyyy')}
                </time>
                <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                  {post.content.substring(0, 200)}...
                </p>
                <div className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm sm:text-base">
                  Read more →
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}