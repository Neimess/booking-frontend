// src/components/search/SearchBar.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Search as SearchIcon,
  LocationOn,
  CalendarToday,
  Person
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const SearchBar = ({ onSearch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    onSearch({
      destination,
      startDate: checkInDate,
      endDate: checkOutDate,
      adults,
      children,
      rooms
    });
  };

  // Расчет количества ночей
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        mb: 3,
      }}
    >
      {/* Синяя верхняя секция */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          p: 3,
          pb: isMobile ? 3 : 6
        }}
      >
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Найдите идеальное жилье с BookingForge
        </Typography>
        <Typography variant="body1">
          Комфортные отели, современные апартаменты и уютные гостевые дома
        </Typography>
      </Box>

      {/* Карточка с формой поиска */}
      <Box
        sx={{
          mx: 2,
          mt: isMobile ? -2 : -4,
          mb: 2,
          position: 'relative',
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: 1,
          }}
        >
          <Grid container spacing={2}>
            {/* Строка поиска направлений */}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              />
            </Grid>

            {/* Даты заезда и выезда */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Дата заезда"
                value={checkInDate}
                onChange={(newDate) => {
                  setCheckInDate(newDate);

                  // Если дата выезда раньше или равна новой дате заезда,
                  // обновляем дату выезда на день позже
                  if (checkOutDate <= newDate) {
                    const newCheckOut = new Date(newDate);
                    newCheckOut.setDate(newCheckOut.getDate() + 1);
                    setCheckOutDate(newCheckOut);
                  }
                }}
                format="dd.MM.yyyy"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday color="action" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              />
              {!isMobile && checkInDate && checkOutDate && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
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
                  const minDate = new Date(checkInDate);
                  minDate.setDate(minDate.getDate() + 1);
                  return minDate;
                })()}
                format="dd.MM.yyyy"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday color="action" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              />
            </Grid>

            {/* Количество гостей и номеров */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="adults-label">Взрослых</InputLabel>
                <Select
                  labelId="adults-label"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  label="Взрослых"
                  startAdornment={
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  }
                  sx={{
                    backgroundColor: '#fff',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} {num === 1 ? 'взрослый' : 'взрослых'}
                    </MenuItem>
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
                  startAdornment={
                    <InputAdornment position="start">
                      <Person color="action" fontSize="small" />
                    </InputAdornment>
                  }
                  sx={{
                    backgroundColor: '#fff',
                  }}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} {num === 0 ? 'детей' : num === 1 ? 'ребенок' : num < 5 ? 'ребенка' : 'детей'}
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
                  sx={{
                    backgroundColor: '#fff',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} {num === 1 ? 'номер' : num < 5 ? 'номера' : 'номеров'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Кнопка поиска */}
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
                  '&:hover': {
                    bgcolor: '#005999'
                  }
                }}
              >
                Найти отели
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Чекбоксы и дополнительные опции */}
      <Box sx={{ px: 3, pb: 3 }}>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', fontWeight: 'medium', cursor: 'pointer' }}>
          <input type="checkbox" id="business" style={{ marginRight: 8 }} />
          <label htmlFor="business">Я путешествую по работе</label>
        </Typography>
      </Box>
    </Paper>
  );
};

export default SearchBar;
