import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
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

      {/* Updated Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            {editingId === post.id ? (
              // Edit Form
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(post);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => setPosts(posts.map(p => 
                      p.id === post.id ? { ...p, title: e.target.value } : p
                    ))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={post.content}
                    onChange={(e) => setPosts(posts.map(p => 
                      p.id === post.id ? { ...p, content: e.target.value } : p
                    ))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    value={post.image_url}
                    onChange={(e) => setPosts(posts.map(p => 
                      p.id === post.id ? { ...p, image_url: e.target.value } : p
                    ))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={post.published}
                    onChange={(e) => setPosts(posts.map(p => 
                      p.id === post.id ? { ...p, published: e.target.checked } : p
                    ))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Published</label>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                </div>
              </form>
            ) : (
              // View Mode
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.created_at || '').toLocaleDateString()}
                </p>
              </div>
                  <div className="flex space-x-2">
                <button
                      onClick={() => setEditingId(post.id || null)}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50"
                    >
                      <Edit2 className="h-4 w-4" />
                </button>
                <button
                      onClick={() => post.id && handleDelete(post.id)}
                      className="inline-flex items-center p-2 border border-red-300 rounded-md text-red-500 hover:bg-red-50"
                >
                      <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
                <div className="prose max-w-none">
                  <div className="mb-4">
              <img
                src={post.image_url}
                alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-gray-600 line-clamp-3">{post.content}</p>
                </div>
                <div className="mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}