import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import HotelIcon from '@mui/icons-material/Hotel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Функция для получения текста статуса бронирования на русском
const getStatusText = (status) => {
  const statusMap = {
    confirmed: 'Подтверждено',
    pending: 'Ожидает подтверждения',
    completed: 'Завершено',
    cancelled: 'Отменено'
  };
  return statusMap[status] || status;
};

// Функция для получения цвета статуса бронирования
const getStatusColor = (status) => {
  const colorMap = {
    confirmed: 'success',
    pending: 'warning',
    completed: 'info',
    cancelled: 'error'
  };
  return colorMap[status] || 'default';
};

export default function BookingCard({ booking, onCancel }) {
  // Форматирование дат
  const checkInDate = new Date(booking.startDate);
  const checkOutDate = new Date(booking.endDate);

  const formattedCheckIn = format(checkInDate, 'dd MMMM yyyy', { locale: ru });
  const formattedCheckOut = format(checkOutDate, 'dd MMMM yyyy', { locale: ru });

  // Расчет количества ночей
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  return (
    <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Grid container>
        {/* Hotel Image */}
        <Grid item xs={12} sm={4} md={3}>
          <CardMedia
            component="img"
            sx={{
              height: { xs: 200, sm: '100%' },
              width: '100%',
              objectFit: 'cover'
            }}
            image={booking.hotel?.image || 'https://placehold.co/600x400/eee/999?text=Нет+изображения'}
            alt={booking.hotel?.name}
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400/eee/999?text=Нет+изображения';
            }}
          />
        </Grid>

        {/* Booking Details */}
        <Grid item xs={12} sm={8} md={9}>
          <CardContent sx={{ p: 3 }}>
            {/* Status Chip */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" gutterBottom component="h2">
                {booking.hotel?.name}
              </Typography>
              <Chip
                label={getStatusText(booking.status)}
                color={getStatusColor(booking.status)}
                size="small"
                variant={booking.status === 'cancelled' ? 'outlined' : 'filled'}
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              {/* Room Type */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <HotelIcon color="action" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Тип номера
                    </Typography>
                    <Typography variant="body1">
                      {booking.room?.name || 'Стандартный номер'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Dates */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <CalendarTodayIcon color="action" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Даты проживания
                    </Typography>
                    <Typography variant="body1">
                      {formattedCheckIn} — {formattedCheckOut}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Guests */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <PersonIcon color="action" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Количество гостей
                    </Typography>
                    <Typography variant="body1">
                      {booking.guests} {booking.guests === 1 ? 'гость' :
                        booking.guests < 5 ? 'гостя' : 'гостей'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Price */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <AttachMoneyIcon color="action" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Стоимость
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {booking.totalPrice} ₽
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
              <Button
                color="error"
                variant="outlined"
                onClick={() => onCancel(booking.id)}
                size="small"
              >
                Отменить бронирование
              </Button>
            )}
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
