import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Box, Paper, Divider, Typography, ToggleButtonGroup, ToggleButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ViewListIcon from '@mui/icons-material/ViewList';
import MapIcon from '@mui/icons-material/Map';

// Import components
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/search/SearchResults';
import MapView from '../components/map/MapView';
import { getMockHotels } from '../services/mockApi';

const SearchPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const searchCity = queryParams.get('city') || '';
  const searchDates = {
    checkIn: queryParams.get('checkIn') || '',
    checkOut: queryParams.get('checkOut') || '',
  };
  const searchGuests = queryParams.get('guests') ? parseInt(queryParams.get('guests'), 10) : 2;

  // Load hotels
  useEffect(() => {
    setLoading(true);
    getMockHotels()
      .then(data => {
        // Filter if there's a city
        let filteredData = data;
        if (searchCity) {
          filteredData = data.filter(hotel =>
            hotel.city.toLowerCase().includes(searchCity.toLowerCase())
          );
        }
        setHotels(filteredData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching hotels:', err);
        setError('Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
        setLoading(false);
      });
  }, [searchCity]);

  // Handle hotel selection
  const handleSelectHotel = (hotel) => {
    navigate(`/hotel/${hotel.id}`);
  };

  // Handle view mode change
  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // Convert hotels to map points format
  const mapPoints = hotels.map(hotel => ({
    id: hotel.id,
    coords: [hotel.lat || 55.7558, hotel.lng || 37.6173], // Use Moscow as fallback if no coords
    label: hotel.name
  }));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Search Bar */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <SearchBar initialCity={searchCity} initialDates={searchDates} initialGuests={searchGuests} />
      </Paper>

      {/* Results Count & View Toggle */}
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

      {/* Mobile View */}
      {isMobile && (
        <Box>
          {viewMode === 'list' ? (
            <SearchResults
              listings={hotels}
              onSelect={handleSelectHotel}
              isLoading={loading}
              error={error}
            />
          ) : (
            <Box sx={{ height: 'calc(100vh - 300px)', mb: 4 }}>
              <MapView
                points={mapPoints}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Desktop View */}
      {!isMobile && (
        <Grid container spacing={3}>
          {/* List */}
          <Grid item xs={12} md={7} lg={8}>
            <SearchResults
              listings={hotels}
              onSelect={handleSelectHotel}
              isLoading={loading}
              error={error}
            />
          </Grid>

          {/* Map */}
          <Grid item xs={12} md={5} lg={4}>
            <Box sx={{
              height: 'calc(100vh - 200px)',
              position: 'sticky',
              top: 100
            }}>
              <Paper elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <MapView
                  points={mapPoints}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default SearchPage;