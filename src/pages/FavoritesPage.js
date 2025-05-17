import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Alert } from '@mui/material';
import HotelCard from '../components/search/HotelCard';
import { getMockHotels } from '../services/mockApi'; // или твой источник данных

const getFavorites = () => JSON.parse(localStorage.getItem('favorites') || '[]');

const FavoritesPage = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            const all = await getMockHotels(); // Получить все отели
            const favorites = getFavorites();
            const filtered = all.filter(hotel => favorites.includes(hotel.id));
            setHotels(filtered);
            setLoading(false);
        };

        fetchFavorites();
    }, []);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Избранные отели</Typography>

            {loading ? (
                <Typography>Загрузка...</Typography>
            ) : hotels.length === 0 ? (
                <Alert severity="info">У вас пока нет избранных отелей.</Alert>
            ) : (
                <Grid container spacing={3}>
                    {hotels.map((hotel) => (
                        <Grid item xs={12} sm={6} md={4} key={hotel.id}>
                            <HotelCard hotel={hotel} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default FavoritesPage;
