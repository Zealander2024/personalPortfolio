import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, MessageSquare, User } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const { error } = await supabase
      .from('contact_messages')
      .insert([formData]);

    if (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Get in Touch</h1>
        
        {status === 'success' ? (
          <div className="bg-green-50 p-4 rounded-md mb-6 sm:mb-8">
            <p className="text-green-800 text-sm sm:text-base">
              Thank you for your message! I'll get back to you soon.
            </p>
          </div>
        ) : status === 'error' ? (
          <div className="bg-red-50 p-4 rounded-md mb-6 sm:mb-8">
            <p className="text-red-800 text-sm sm:text-base">
              There was an error sending your message. Please try again.
            </p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <User className="h-4 w-4 mr-1" />
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-indigo-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 text-sm sm:text-base"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}