import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Grid, TextField, Button, Typography, FormControl,
  InputLabel, Select, MenuItem, InputAdornment, useTheme, useMediaQuery
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Search as SearchIcon, LocationOn, CalendarToday, Person
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({
  initialCity = '',
  initialDates = {},
  initialGuests = 2
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const [destination, setDestination] = useState(initialCity);
  const [checkInDate, setCheckInDate] = useState(() => {
    return initialDates.checkIn ? new Date(initialDates.checkIn) : new Date();
  });
  const [checkOutDate, setCheckOutDate] = useState(() => {
    if (initialDates.checkOut) return new Date(initialDates.checkOut);
    const date = new Date(); date.setDate(date.getDate() + 2);
    return date;
  });
  const [adults, setAdults] = useState(initialGuests);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    const query = new URLSearchParams({
      destination,
      checkIn: format(checkInDate, 'yyyy-MM-dd'),
      checkOut: format(checkOutDate, 'yyyy-MM-dd'),
      adults,
      children,
      rooms
    }).toString();

    navigate(`/search?${query}`);
  };

  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  return (
    <Paper elevation={3} sx={{ width: '100%', borderRadius: 1, overflow: 'hidden', mb: 3 }}>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, pb: isMobile ? 3 : 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Найдите идеальное жилье с BookingForge
        </Typography>
        <Typography>
          Комфортные отели, современные апартаменты и уютные гостевые дома
        </Typography>
      </Box>

      <Box sx={{ mx: 2, mt: isMobile ? -2 : -4, mb: 2 }}>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 1 }}>
          <Grid container spacing={2}>
            {/* Город */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Куда вы хотите поехать?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#fff' } }}
              />
            </Grid>

            {/* Даты */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Дата заезда"
                value={checkInDate}
                onChange={(newDate) => {
                  setCheckInDate(newDate);
                  if (checkOutDate <= newDate) {
                    const next = new Date(newDate);
                    next.setDate(next.getDate() + 1);
                    setCheckOutDate(next);
                  }
                }}
                format="dd.MM.yyyy"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday color="action" />
                        </InputAdornment>
                      )
                    }
                  }
                }}
                sx={{ width: '100%' }}
              />
              {!isMobile && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Дата выезда"
                value={checkOutDate}
                onChange={setCheckOutDate}
                minDate={(() => {
                  const min = new Date(checkInDate);
                  min.setDate(min.getDate() + 1);
                  return min;
                })()}
                format="dd.MM.yyyy"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday color="action" />
                        </InputAdornment>
                      )
                    }
                  }
                }}
                sx={{ width: '100%' }}
              />
            </Grid>

            {/* Гости */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="adults-label">Взрослых</InputLabel>
                <Select
                  labelId="adults-label"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  label="Взрослых"
                  sx={{ backgroundColor: '#fff' }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <MenuItem key={n} value={n}>{n} {n === 1 ? 'взрослый' : 'взрослых'}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="children-label">Дети</InputLabel>
                <Select
                  labelId="children-label"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  label="Дети"
                  sx={{ backgroundColor: '#fff' }}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                    <MenuItem key={n} value={n}>
                      {n} {n === 0 ? 'детей' : n === 1 ? 'ребенок' : n < 5 ? 'ребенка' : 'детей'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="rooms-label">Номера</InputLabel>
                <Select
                  labelId="rooms-label"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  label="Номера"
                  sx={{ backgroundColor: '#fff' }}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <MenuItem key={n} value={n}>
                      {n} {n === 1 ? 'номер' : n < 5 ? 'номера' : 'номеров'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Кнопка */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: 1,
                  bgcolor: '#0071c2',
                  '&:hover': { bgcolor: '#005999' }
                }}
              >
                Найти отели
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box sx={{ px: 3, pb: 3 }}>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
          <input type="checkbox" id="business" style={{ marginRight: 8 }} />
          <label htmlFor="business">Я путешествую по работе</label>
        </Typography>
      </Box>
    </Paper>
  );
};

export default SearchBar;
