import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { Mail, User, MessageSquare, Check, X } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export default function MessageViewer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  }

  async function toggleRead(message: Message) {
    const { error } = await supabase
      .from('contact_messages')
      .update({ read: !message.read })
      .eq('id', message.id);

    if (error) {
      console.error('Error updating message:', error);
    } else {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, read: !m.read } : m
      ));
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting message:', error);
    } else {
      setMessages(messages.filter(message => message.id !== id));
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading messages...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      <div className="space-y-6">
        {messages.map(message => (
          <div
            key={message.id}
            className={`border rounded-lg p-6 ${
              message.read ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{message.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a
                    href={`mailto:${message.email}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {message.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <span>
                    {format(new Date(message.created_at), 'PPpp')}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleRead(message)}
                  className={`p-2 rounded-full ${
                    message.read
                      ? 'text-green-600 hover:bg-green-100'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(message.id)}
                  className="p-2 rounded-full text-red-600 hover:bg-red-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap">{message.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No messages yet
          </div>
        )}
      </div>
    </div>
  );
}