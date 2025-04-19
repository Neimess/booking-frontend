import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import MyBookings from '../components/bookings/MyBookings';
import { fetchMyBookings, cancelBooking } from '../api/bookingsApi';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clientId = 1; // В реальном приложении ID клиента пришел бы из контекста аутентификации

  useEffect(() => {
    const getBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMyBookings(clientId);
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Произошла ошибка при загрузке бронирований. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, [clientId]);

  const handleCancel = async (bookingId) => {
    try {
      setLoading(true);
      await cancelBooking(clientId, bookingId);
      const updated = await fetchMyBookings(clientId);
      setBookings(updated);
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError('Произошла ошибка при отмене бронирования. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setError(null);
    setLoading(true);
    fetchMyBookings(clientId)
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error refreshing bookings:', err);
        setError('Произошла ошибка при обновлении данных. Пожалуйста, попробуйте позже.');
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Мои бронирования
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={6}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Box my={3}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={handleRefresh}>
            Попробовать снова
          </Button>
        </Box>
      ) : (
        <Box mt={3}>
          <MyBookings bookings={bookings} onCancel={handleCancel} />
        </Box>
      )}
    </Container>
  );
}
