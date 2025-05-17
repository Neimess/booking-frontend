import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import BookingsPage from './pages/BookingsPage';
import AdminPage from './pages/AdminPage';
import BookingViewPage from './pages/BookingViewPage';
import NotFound from './pages/NotFound';
import HotelDetailPage from './pages/HotelDetailPage';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/booking/:id" element={<BookingViewPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/hotels/:id" element={<HotelDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}
