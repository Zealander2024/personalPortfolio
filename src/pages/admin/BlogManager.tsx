import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Upload, X, Eye } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  published: boolean;
  created_at: string;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    published: false
  });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blog-images/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      
      setNewPost({
        ...newPost,
        image_url: data.publicUrl
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([newPost])
      .select();

    if (error) {
      console.error('Error creating post:', error);
    } else {
      setPosts([...(data || []), ...posts]);
      setNewPost({
        title: '',
        content: '',
        published: false
      });
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      setPosts(posts.filter(post => post.id !== id));
    }
  }

  async function togglePublished(post: BlogPost) {
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: !post.published })
      .eq('id', post.id);

    if (error) {
      console.error('Error updating post:', error);
    } else {
      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, published: !p.published } : p
      ));
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading posts...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <div className="flex items-center space-x-4">
            {newPost.image_url && (
              <img
                src={newPost.image_url}
                alt="Cover preview"
                className="h-20 w-20 object-cover rounded"
              />
            )}
            <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
              <Upload className="h-5 w-5 inline-block mr-2" />
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Content (Markdown supported)
            </label>
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              <Eye className="h-4 w-4 inline-block mr-1" />
              {preview ? 'Edit' : 'Preview'}
            </button>
          </div>
          <textarea
            value={newPost.content}
            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={12}
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={newPost.published}
            onChange={e => setNewPost({ ...newPost, published: e.target.checked })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Publish immediately
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Post
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6">Published Posts</h2>
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => togglePublished(post)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    post.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-gray-600 line-clamp-3">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}