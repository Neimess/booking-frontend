import { useState, useEffect } from 'react';
import api from '../api';

export function useBookings(clientId) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.fetchMyBookings(clientId).then(setBookings);
  }, [clientId]);

  return bookings;
}