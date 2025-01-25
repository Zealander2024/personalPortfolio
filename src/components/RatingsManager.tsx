// Create this component to show ratings in the admin panel
// Similar structure to BookingManager 

import React, { useEffect, useState } from 'react';
import { Star, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Rating {
  id: string;
  name: string;
  rating: number;
  caption: string;
  created_at: string;
}

interface Report {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

export default function RatingsManager() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ratings' | 'reports'>('ratings');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ratingsData, reportsData] = await Promise.all([
        supabase.from('ratings').select('*').order('created_at', { ascending: false }),
        supabase.from('reports').select('*').order('created_at', { ascending: false })
      ]);

      if (ratingsData.data) setRatings(ratingsData.data);
      if (reportsData.data) setReports(reportsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: 'rating' | 'report') => {
    try {
      const { error } = await supabase
        .from(type === 'rating' ? 'ratings' : 'reports')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (type === 'rating') {
        setRatings(ratings.filter(r => r.id !== id));
      } else {
        setReports(reports.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('ratings')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'ratings'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500'
          }`}
        >
          Ratings
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'reports'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500'
          }`}
        >
          Reports
        </button>
      </div>

      {activeTab === 'ratings' ? (
        <div className="grid gap-4">
          {ratings.map((rating) => (
            <div
              key={rating.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{rating.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">{rating.caption}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(rating.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(rating.id, 'rating')}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{report.name}</span>
                    <span className="text-gray-500">({report.email})</span>
                  </div>
                  <p className="text-gray-600 mt-1">{report.message}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(report.id, 'report')}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 