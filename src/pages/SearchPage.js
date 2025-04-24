// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ViewListIcon from '@mui/icons-material/ViewList';
import MapIcon from '@mui/icons-material/Map';

import SearchBar from '../components/SearchBar';
import SearchResults from '../components/search/SearchResults';
import MapView from '../components/map/MapView';
import SidebarFilters from '../components/search/SidebarFilters';
import { getMockHotels } from '../services/mockApi';

export default function SearchPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  // Параметры поиска из URL
  const queryParams = new URLSearchParams(location.search);
  const searchCity = queryParams.get('city') || '';
  const searchDates = {
    checkIn: queryParams.get('checkIn') || '',
    checkOut: queryParams.get('checkOut') || '',
  };
  const searchGuests = queryParams.get('guests')
    ? parseInt(queryParams.get('guests'), 10)
    : 2;

  // Загрузка отелей
  useEffect(() => {
    setLoading(true);
    getMockHotels()
      .then(data => {
        let filtered = data;
        if (searchCity) {
          filtered = data.filter(h =>
            h.city.toLowerCase().includes(searchCity.toLowerCase())
          );
        }
        setHotels(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Ошибка при загрузке данных. Попробуйте позже.');
        setLoading(false);
      });
  }, [searchCity]);

  const handleSelectHotel = hotel => {
    navigate(`/hotel/${hotel.id}`);
  };

  const handleViewModeChange = (_e, newMode) => {
    if (newMode) setViewMode(newMode);
  };

  const mapPoints = hotels.map(h => ({
    id: h.id,
    coords: [h.lat || 55.7558, h.lng || 37.6173],
    label: h.name,
  }));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 1) Поисковая строка */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <SearchBar
          initialCity={searchCity}
          initialDates={searchDates}
          initialGuests={searchGuests}
        />
      </Paper>

      {/* 2) Mobile: заголовок+toggle внутри SearchResults */}
      {isMobile && (
        <SearchResults
          listings={hotels}
          onSelect={handleSelectHotel}
          isLoading={loading}
          error={error}
          showHeaderToggle={true}  // прокинем пропсу, чтобы внутри показывалась шапка
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />
      )}

      {/* 3) Desktop: фильтры / (заголовок+список) / карта */}
      {!isMobile && (
        <Grid container spacing={3}>
          {/* Фильтры */}
          <Grid item xs={12} md={3}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <SidebarFilters />
            </Box>
          </Grid>

          {/* Центральная колонка */}
          <Grid item xs={12} md={6}>
            {/* Заголовок + Toggle */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">
                {loading ? 'Поиск...' : `Найдено ${hotels.length} вариантов`}
              </Typography>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                aria-label="view mode"
              >
                <ToggleButton value="list" aria-label="list view">
                  <ViewListIcon />
                </ToggleButton>
                <ToggleButton value="map" aria-label="map view">
                  <MapIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Список отелей */}
            <SearchResults
              listings={hotels}
              onSelect={handleSelectHotel}
              isLoading={loading}
              error={error}
            />
          </Grid>

          {/* Карта */}
          <Grid item xs={12} md={3}>
            <Box sx={{ position: 'sticky', top: 100, height: 'calc(100vh - 200px)' }}>
              <Paper elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <MapView points={mapPoints} />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
