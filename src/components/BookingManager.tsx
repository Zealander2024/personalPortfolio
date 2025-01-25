import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Mail, User, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  date: string;
  status: string;
  created_at: string;
}

export default function BookingManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateBookingStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Booking Management</h2>
      
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{booking.service}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  {booking.name}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {booking.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(booking.date).toLocaleString()}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Requested: {new Date(booking.created_at).toLocaleString()}
                </div>
              </div>

              <div>
                <p className="text-gray-600">{booking.message}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirm
              </button>
              <button
                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 