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
  const theme     = useTheme();
  const isMobile  = useMediaQuery(theme.breakpoints.down('md'));
  const navigate  = useNavigate();
  const location  = useLocation();

  /* ---------- state ---------- */
  const [hotels, setHotels]     = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [viewMode, setViewMode] = useState('list');

  /* ---------- параметры из URL ---------- */
  const queryParams       = new URLSearchParams(location.search);
  const searchDestination = queryParams.get('destination') || '';
  const searchDates = {
    checkIn:  queryParams.get('checkIn')  || '',
    checkOut: queryParams.get('checkOut') || '',
  };
  const searchGuests = parseInt(queryParams.get('adults') || '2', 10);

  /* Есть ли хоть один параметр? */
  const hasSearchParams = !!searchDestination || !!searchDates.checkIn || !!searchDates.checkOut;

  /* ---------- загрузка / фильтрация ---------- */
  useEffect(() => {
    /* если пользователь ещё не нажал поиск — ничего не грузим */
    if (!hasSearchParams) {
      setHotels([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getMockHotels()
      .then(data => {
        const filtered = searchDestination
          ? data.filter(h =>
              h.city.toLowerCase().includes(searchDestination.toLowerCase())
            )
          : data;
        setHotels(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Ошибка при загрузке данных. Попробуйте позже.');
        setLoading(false);
      });
  }, [hasSearchParams, searchDestination]);

  /* ---------- колбэки ---------- */
  const handleSelectHotel = hotel => navigate(`/hotels/${hotel.id}`);

  const handleViewModeChange = (_e, newMode) => {
    if (newMode) setViewMode(newMode);
  };

  const mapPoints = hotels.map(h => ({
    id: h.id,
    coords: [h.lat || 55.7558, h.lng || 37.6173],
    label: h.name,
  }));

  /* ---------- UI ---------- */
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* форма поиска всегда видна */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <SearchBar
          initialCity={searchDestination}
          initialDates={searchDates}
          initialGuests={searchGuests}
        />
      </Paper>

      {/* список/карта — только если параметры заданы */}
      {hasSearchParams && (
        isMobile ? (
          <SearchResults
            listings={hotels}
            onSelect={handleSelectHotel}
            isLoading={loading}
            error={error}
            showHeaderToggle={true}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
        ) : (
          <Grid container spacing={3}>
            {/* фильтры */}
            <Grid item xs={12} md={3}>
              <Box sx={{ position: 'sticky', top: 100 }}>
                <SidebarFilters />
              </Box>
            </Grid>

            {/* результаты */}
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">
                  {loading
                    ? 'Поиск...'
                    : `Найдено ${hotels.length} вариантов`}
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

              <SearchResults
                listings={hotels}
                onSelect={handleSelectHotel}
                isLoading={loading}
                error={error}
              />
            </Grid>

            {/* карта */}
            <Grid item xs={12} md={3}>
              <Box sx={{ position: 'sticky', top: 100, height: 'calc(100vh - 200px)' }}>
                <Paper elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                  <MapView points={mapPoints} />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        )
      )}

      {/* если параметров нет — можно показать приветственный текст */}
      {!hasSearchParams && (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          Укажите направление и даты, чтобы увидеть доступные варианты проживания
        </Typography>
      )}
    </Container>
  );
}
