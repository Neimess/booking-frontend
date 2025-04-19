import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    Rating,
    Chip,
    Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import SpaIcon from '@mui/icons-material/Spa';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// Styled components for better visual presentation
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[8],
    },
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius * 2,
}));

const PriceTag = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: 0,
    top: 20,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0.75, 2),
    borderTopLeftRadius: theme.shape.borderRadius * 2,
    borderBottomLeftRadius: theme.shape.borderRadius * 2,
    fontWeight: 'bold',
    zIndex: 2,
}));

// Map amenity names to icons
const amenityIcons = {
    'Бесплатный Wi-Fi': <WifiIcon fontSize="small" />,
    'Бассейн': <PoolIcon fontSize="small" />,
    'Спа': <SpaIcon fontSize="small" />,
    'Тренажерный зал': <FitnessCenterIcon fontSize="small" />,
    'Ресторан': <RestaurantIcon fontSize="small" />,
    'Парковка': <LocalParkingIcon fontSize="small" />,
    'Завтрак включен': <FreeBreakfastIcon fontSize="small" />,
};

export default function HotelCard({ hotel, onSelect }) {
    // Handle fallback image
    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/600x400/eee/999?text=Фото+не+доступно';
    };

    return (
        <StyledCard>
            {/* Price tag */}
            <PriceTag>
                от {hotel.price} ₽
            </PriceTag>

            {/* Hotel image */}
            <CardMedia
                component="img"
                height="200"
                image={hotel.images?.[0] || 'https://placehold.co/600x400/eee/999?text=Фото+не+доступно'}
                alt={hotel.name}
                onError={handleImageError}
            />

            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                {/* Hotel name and rating */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" component="h2" noWrap>
                        {hotel.name}
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Rating
                            value={parseFloat(hotel.rating) || 0}
                            precision={0.5}
                            size="small"
                            readOnly
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                            ({hotel.reviewCount || 0})
                        </Typography>
                    </Box>
                </Box>

                {/* Location */}
                <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {hotel.address || `${hotel.city}, Центр города`}
                    </Typography>
                </Box>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '40px'
                    }}
                >
                    {hotel.description}
                </Typography>

                {/* Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {hotel.amenities.slice(0, 3).map((amenity) => (
                            <Chip
                                key={amenity}
                                icon={amenityIcons[amenity] || null}
                                label={amenity}
                                size="small"
                                variant="outlined"
                                sx={{ mb: 1 }}
                            />
                        ))}
                        {hotel.amenities.length > 3 && (
                            <Chip
                                label={`+${hotel.amenities.length - 3}`}
                                size="small"
                                variant="outlined"
                                sx={{ mb: 1 }}
                            />
                        )}
                    </Stack>
                )}
            </CardContent>

            {/* Action Button */}
            <Box p={2} pt={0}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => onSelect(hotel)}
                >
                    Подробнее
                </Button>
            </Box>
        </StyledCard>
    );
} 