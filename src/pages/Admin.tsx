import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProjectManager from './admin/ProjectManager';
import BlogManager from './admin/BlogManager';
import MessageViewer from './admin/MessageViewer';
import { 
  FolderKanban, 
  FileEdit, 
  MessageSquare, 
  Calendar, 
  Star, 
  Flag,
  Settings,
  User,
  BarChart 
} from 'lucide-react';
import BookingManager from '../components/BookingManager';
import RatingsManager from '../components/RatingsManager';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../components/ui/tabs';
import { supabase } from '../lib/supabase';
import ReportsManager from '../components/ReportsManager';

interface DashboardStats {
  projects: number;
  posts: number;
  bookings: number;
  ratings: number;
  reports: number;
}

export default function Admin() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    posts: 0,
    bookings: 0,
    ratings: 0,
    reports: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [bookingsData, ratingsData, projectsData, postsData, reportsData] = await Promise.all([
        supabase
          .from('bookings')
          .select('*', { count: 'exact' })
          .eq('status', 'active'),
        supabase
          .from('ratings')
          .select('*', { count: 'exact' }),
        supabase
          .from('projects')
          .select('*', { count: 'exact' }),
        supabase
          .from('posts')
          .select('*', { count: 'exact' })
          .eq('published', true),
        supabase
          .from('reports')
          .select('*', { count: 'exact' })
      ]);

      setStats({
        projects: projectsData.data?.length || 0,
        posts: postsData.data?.length || 0,
        bookings: bookingsData.data?.length || 0,
        ratings: ratingsData.data?.length || 0,
        reports: reportsData.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-indigo-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">{user.email}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Total Projects"
            value={stats.projects.toString()}
            icon={FolderKanban}
            color="indigo"
          />
          <StatCard
            title="Blog Posts"
            value={stats.posts.toString()}
            icon={FileEdit}
            color="blue"
          />
          <StatCard
            title="Active Bookings"
            value={stats.bookings.toString()}
            icon={Calendar}
            color="green"
          />
          <StatCard
            title="Total Ratings"
            value={stats.ratings.toString()}
            icon={Star}
            color="yellow"
          />
          <StatCard
            title="Reports"
            value={stats.reports.toString()}
            icon={Flag}
            color="red"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          <Tabs>
            <TabList className="border-b border-gray-200">
              <Tab index={0} className="tab-item">
                <FolderKanban className="h-5 w-5" />
                <span>Projects</span>
              </Tab>
              <Tab index={1} className="tab-item">
                <FileEdit className="h-5 w-5" />
                <span>Blog Posts</span>
              </Tab>
              <Tab index={2} className="tab-item">
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
              </Tab>
              <Tab index={3} className="tab-item">
                <Calendar className="h-5 w-5" />
                <span>Bookings</span>
              </Tab>
              <Tab index={4} className="tab-item">
                <Star className="h-5 w-5" />
                <span>Ratings</span>
              </Tab>
              <Tab index={5} className="tab-item">
                <Flag className="h-5 w-5" />
                <span>Reports</span>
              </Tab>
            </TabList>

            <TabPanels className="p-6">
              <TabPanel index={0}>
                <ProjectManager />
              </TabPanel>
              <TabPanel index={1}>
                <BlogManager />
              </TabPanel>
              <TabPanel index={2}>
                <MessageViewer />
              </TabPanel>
              <TabPanel index={3}>
                <BookingManager />
              </TabPanel>
              <TabPanel index={4}>
                <RatingsManager />
              </TabPanel>
              <TabPanel index={5}>
                <ReportsManager />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: 'indigo' | 'blue' | 'green' | 'yellow' | 'red';
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-lg shadow px-6 py-5">
      <div className="flex items-center">
        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}