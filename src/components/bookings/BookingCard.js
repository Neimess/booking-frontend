import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Box
} from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import HotelIcon from '@mui/icons-material/Hotel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const getStatusText = (status) => ({
  confirmed: 'Подтверждено',
  pending: 'Ожидает подтверждения',
  completed: 'Завершено',
  cancelled: 'Отменено'
}[status] || status);

const getStatusColor = (status) => ({
  confirmed: 'success',
  pending: 'warning',
  completed: 'info',
  cancelled: 'error'
}[status] || 'default');

export default function BookingCard({ booking, onCancel }) {
  const checkInDate = new Date(booking.startDate);
  const checkOutDate = new Date(booking.endDate);
  const formattedCheckIn = format(checkInDate, 'dd MMMM yyyy', { locale: ru });
  const formattedCheckOut = format(checkOutDate, 'dd MMMM yyyy', { locale: ru });
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        mb: 3,
        bgcolor: 'background.paper',
        boxShadow: 3,
        transition: '0.3s ease-in-out',
        '&:hover': { boxShadow: 6 }
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={4} md={3}>
          <CardMedia
            component="img"
            sx={{ height: '100%', objectFit: 'cover' }}
            image={booking.hotel?.image || 'https://placehold.co/600x400/eee/999?text=Нет+изображения'}
            alt={booking.hotel?.name}
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400/eee/999?text=Нет+изображения';
            }}
          />
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" component="h2" fontWeight={600}>
                {booking.hotel?.name}
              </Typography>
              <Chip
                label={getStatusText(booking.status)}
                color={getStatusColor(booking.status)}
                variant={booking.status === 'cancelled' ? 'outlined' : 'filled'}
                size="small"
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <InfoItem icon={<HotelIcon />} label="Тип номера" value={booking.room?.name || 'Стандартный'} />
              <InfoItem icon={<CalendarTodayIcon />} label="Даты проживания" value={`${formattedCheckIn} — ${formattedCheckOut}`} />
              <InfoItem icon={<PersonIcon />} label="Гости" value={`${booking.guests} ${booking.guests === 1 ? 'гость' : booking.guests < 5 ? 'гостя' : 'гостей'}`} />
              <InfoItem icon={<AttachMoneyIcon />} label="Стоимость" value={`${booking.totalPrice} ₽`} bold />
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

function InfoItem({ icon, label, value, bold = false }) {
  return (
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <Box sx={{ mr: 1 }}>{icon}</Box>
        <Box>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
          <Typography variant="body1" fontWeight={bold ? 'bold' : 'normal'}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
