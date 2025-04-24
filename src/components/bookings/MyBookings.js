import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import { format } from 'date-fns';
import BookingCard from './BookingCard';

export default function MyBookings({ bookings = [], isLoading = false, onCancel }) {
  /* --- локальные состояния фильтров --- */
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  /* --- лоадер --- */
  if (isLoading) {
    return (
      <Box height="300px" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  /* --- фильтрация --- */
  const filteredBookings = bookings
    .filter(b => (statusFilter ? b.status === statusFilter : true))
    .filter(b => {
      if (!dateFilter) return true;
      return format(new Date(b.startDate), 'yyyy-MM-dd') === dateFilter;
    });

  /* --- если ничего нет --- */
  if (!filteredBookings.length) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {bookings.length ? 'По выбранным фильтрам ничего не найдено' : 'У вас пока нет бронирований'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Начните поиск отелей, чтобы забронировать проживание
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      {/* --- панель фильтров --- */}
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Статус"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="confirmed">Подтверждено</MenuItem>
              <MenuItem value="pending">Ожидает</MenuItem>
              <MenuItem value="completed">Завершено</MenuItem>
              <MenuItem value="cancelled">Отменено</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type="date"
              fullWidth
              label="Дата заселения"
              InputLabelProps={{ shrink: true }}
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      {/* --- список карточек --- */}
      <Stack spacing={3}>
        {filteredBookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} onCancel={onCancel} />
        ))}
      </Stack>
    </>
  );
}
