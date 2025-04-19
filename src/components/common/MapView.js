import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { getMockHotels } from '../../services/mockApi';

// Стили для карты
const containerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    borderRadius: '8px'
};

// Центр карты по умолчанию (Москва)
const defaultCenter = {
    lat: 55.755826,
    lng: 37.617300
};

// API ключ для Google Maps (в реальном проекте должен быть в env переменных)
// Для демо можно использовать временный ключ или оставить пустым
const GOOGLE_MAPS_API_KEY = '';

function MapView({ hotels = [], centerLat, centerLng, zoom = 12 }) {
    const [mockHotels, setMockHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);

    // Загрузка Google Maps API
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    // Если переданы координаты центра, используем их
    useEffect(() => {
        if (centerLat && centerLng) {
            setMapCenter({ lat: centerLat, lng: centerLng });
        }
    }, [centerLat, centerLng]);

    // Если не переданы отели, загружаем моковые данные
    useEffect(() => {
        if (hotels.length === 0) {
            const fetchHotels = async () => {
                const data = await getMockHotels();
                // Добавляем случайные координаты для демонстрации
                const hotelsWithCoords = data.map(hotel => ({
                    ...hotel,
                    lat: defaultCenter.lat + (Math.random() - 0.5) * 0.1,
                    lng: defaultCenter.lng + (Math.random() - 0.5) * 0.1
                }));
                setMockHotels(hotelsWithCoords);
            };

            fetchHotels();
        }
    }, [hotels]);

    // Данные для отображения
    const displayHotels = hotels.length > 0 ? hotels : mockHotels;

    const onMarkerClick = (hotel) => {
        setSelectedHotel(hotel);
    };

    const onMapClick = useCallback(() => {
        setSelectedHotel(null);
    }, []);

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            {!isLoaded ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '400px',
                        bgcolor: '#f5f5f5',
                        borderRadius: '8px'
                    }}
                >
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Загрузка карты...</Typography>
                </Box>
            ) : (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={zoom}
                    onClick={onMapClick}
                    options={{
                        fullscreenControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        zoomControl: true,
                    }}
                >
                    {displayHotels.map(hotel => (
                        <Marker
                            key={hotel.id}
                            position={{ lat: hotel.lat, lng: hotel.lng }}
                            onClick={() => onMarkerClick(hotel)}
                            icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                            }}
                        />
                    ))}

                    {selectedHotel && (
                        <InfoWindow
                            position={{ lat: selectedHotel.lat, lng: selectedHotel.lng }}
                            onCloseClick={() => setSelectedHotel(null)}
                        >
                            <Paper sx={{ p: 1, maxWidth: 200 }}>
                                <Typography variant="subtitle2" fontWeight="bold">{selectedHotel.name}</Typography>
                                <Typography variant="body2">
                                    {selectedHotel.rating} ★ | от {selectedHotel.price} ₽
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {selectedHotel.address || 'Центр города'}
                                </Typography>
                            </Paper>
                        </InfoWindow>
                    )}
                </GoogleMap>
            )}
        </Box>
    );
}

export default MapView; 