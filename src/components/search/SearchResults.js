import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Pagination, CircularProgress, Alert } from '@mui/material';
import HotelCard from './HotelCard';
import { getMockHotels } from '../../services/mockApi';

export default function SearchResults({ listings = [], onSelect, isLoading = false, error = null }) {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  // If no listings provided, use mock data
  useEffect(() => {
    if (listings.length === 0 && !isLoading) {
      setLoading(true);
      getMockHotels()
        .then(data => {
          setHotels(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching mock hotels:', err);
          setLoading(false);
        });
    } else {
      setHotels(listings);
    }
  }, [listings, isLoading]);

  // Calculate pagination
  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  const displayedHotels = hotels.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading || isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Загрузка результатов...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!hotels.length) {
    return (
      <Box py={4} textAlign="center">
        <Typography variant="h6" color="text.secondary">
          Ничего не найдено
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Попробуйте изменить параметры поиска
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
<Grid container spacing={3} alignItems="stretch">
  {displayedHotels.map((hotel) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={hotel.id}
      sx={{ display: 'flex', width: '100%' }} // ← вот здесь добавляем width: '100%'
    >
      <HotelCard hotel={hotel} onSelect={onSelect} />
    </Grid>
  ))}
</Grid>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
}
