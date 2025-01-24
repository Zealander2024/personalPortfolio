import { supabase } from '../lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_id: string;
  published_at: string;
  read_time: number;
  categories: string[];
  author: {
    name: string;
    avatar_url: string;
    bio: string;
  };
}

export const blogService = {
  async getAllPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(name, avatar_url, bio)
      `)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data as BlogPost[];
  },

  async getPostById(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(name, avatar_url, bio)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  async createPost(post: Omit<BlogPost, 'id' | 'author'>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePost(id: string, post: Partial<BlogPost>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blog-covers/${fileName}`;

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
}; 