import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching blog post:', error);
      } else {
        setPost(data);
      }
      setLoading(false);
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Post not found</div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <time className="text-gray-500 text-sm mb-8 block">
        {format(new Date(post.created_at), 'MMMM d, yyyy')}
      </time>
      <div className="prose prose-indigo max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}