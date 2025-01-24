import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PlusCircle, Trash2, Edit2, Save, X } from 'lucide-react';

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  image_url: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState<BlogPost>({
    title: '',
    content: '',
    image_url: '',
    published: false
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          title: newPost.title,
          content: newPost.content,
          image_url: newPost.image_url,
          published: newPost.published
        }])
        .select();

      if (error) throw error;

      setPosts([...(data || []), ...posts]);
      setNewPost({
        title: '',
        content: '',
        image_url: '',
        published: false
      });
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(post: BlogPost) {
    if (!post.id) return;
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: post.title,
          content: post.content,
          image_url: post.image_url,
          published: post.published,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id);

      if (error) throw error;

      setPosts(posts.map(p => p.id === post.id ? post : p));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Blog Manager</h2>

      {/* New Post Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={newPost.image_url}
            onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={newPost.published}
            onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm text-gray-700">Published</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Post
        </button>
      </form>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            {/* Post content */}
          </div>
        ))}
      </div>
    </div>
  );
} 