import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProjectManager from './admin/ProjectManager';
import BlogManager from './admin/BlogManager';
import MessageViewer from './admin/MessageViewer';
import { FolderKanban, FileEdit, MessageSquare } from 'lucide-react';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Link
          to="/admin/projects"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <FolderKanban className="h-8 w-8 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </Link>

        <Link
          to="/admin/blog"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <FileEdit className="h-8 w-8 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Blog Posts</h2>
          <p className="text-gray-600">Write and manage blog posts</p>
        </Link>

        <Link
          to="/admin/messages"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <MessageSquare className="h-8 w-8 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p className="text-gray-600">View contact form submissions</p>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <Routes>
          <Route path="/projects" element={<ProjectManager />} />
          <Route path="/blog" element={<BlogManager />} />
          <Route path="/messages" element={<MessageViewer />} />
        </Routes>
      </div>
    </div>
  );
}