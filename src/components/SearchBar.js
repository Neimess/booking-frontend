import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  InputAdornment,
  Autocomplete,
  Typography,
  IconButton
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { ru } from 'date-fns/locale';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { format } from 'date-fns';

// Список популярных городов
const popularCities = [
  'Москва',
  'Санкт-Петербург',
  'Сочи',
  'Казань',
  'Екатеринбург',
  'Калининград',
  'Нижний Новгород',
  'Новосибирск',
  'Владивосток',
  'Краснодар'
];

export default function SearchBar({ initialCity = '', initialDates = {}, initialGuests = 2 }) {
  const navigate = useNavigate();

  // Состояние формы
  const [city, setCity] = useState(initialCity || '');
  const [checkIn, setCheckIn] = useState(initialDates.checkIn ? new Date(initialDates.checkIn) : null);
  const [checkOut, setCheckOut] = useState(initialDates.checkOut ? new Date(initialDates.checkOut) : null);
  const [guests, setGuests] = useState(initialGuests);

  // Обработчики изменения гостей
  const increaseGuests = () => setGuests(prev => (prev < 10 ? prev + 1 : prev));
  const decreaseGuests = () => setGuests(prev => (prev > 1 ? prev - 1 : prev));

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Форматирование дат для URL
    const checkInStr = checkIn ? format(checkIn, 'yyyy-MM-dd') : '';
    const checkOutStr = checkOut ? format(checkOut, 'yyyy-MM-dd') : '';

    // Создание URL с параметрами
    const queryParams = new URLSearchParams();
    if (city) queryParams.set('city', city);
    if (checkInStr) queryParams.set('checkIn', checkInStr);
    if (checkOutStr) queryParams.set('checkOut', checkOutStr);
    queryParams.set('guests', guests.toString());

    // Переход на страницу результатов
    navigate(`/search?${queryParams.toString()}`);
  };

  // Обеспечиваем, что значения для Autocomplete всегда строки
  const handleChangeCity = (event, newValue) => {
    setCity(newValue || '');
  };

  const handleInputChangeCity = (event, newValue) => {
    setCity(newValue || '');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2} alignItems="center">
          {/* Город */}
          <Grid item xs={12} md={3}>
            <Autocomplete
              freeSolo
              options={popularCities}
              value={city}
              onChange={handleChangeCity}
              inputValue={city}
              onInputChange={handleInputChangeCity}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Город"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="action" />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>

          {/* Дата заезда */}
          <Grid item xs={12} sm={6} md={2.5}>
            <DatePicker
              label="Заезд"
              value={checkIn}
              onChange={setCheckIn}
              format="dd.MM.yyyy"
              minDate={new Date()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined'
                }
              }}
            />
          </Grid>

          {/* Дата выезда */}
          <Grid item xs={12} sm={6} md={2.5}>
            <DatePicker
              label="Выезд"
              value={checkOut}
              onChange={setCheckOut}
              format="dd.MM.yyyy"
              minDate={checkIn || new Date()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined'
                }
              }}
            />
          </Grid>

          {/* Количество гостей */}
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Гости"
                value={guests}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={decreaseGuests}
                        disabled={guests <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={increaseGuests}
                        disabled={guests >= 10}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                fullWidth
              />
            </Box>
          </Grid>

          {/* Кнопка поиска */}
          <Grid item xs={12} sm={6} md={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<SearchIcon />}
              sx={{ height: '56px' }}
            >
              Найти
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
