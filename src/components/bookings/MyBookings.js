import React from 'react';
import { Box, Typography, Stack, Alert, Paper } from '@mui/material';
import BookingCard from './BookingCard';

export default function MyBookings({ bookings, onCancel }) {
  if (!bookings || !bookings.length) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          У вас пока нет бронирований
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Начните поиск отелей, чтобы забронировать проживание
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={3}>
      {bookings.map(booking => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancel}
        />
      ))}
    </Stack>
  );
}