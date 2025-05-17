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
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Высоты блоков карточки
const CARD_MEDIA_H = 200;
const CARD_CONTENT_H = 210;
const CARD_ACTIONS_H = 56;
const CARD_HEIGHT = CARD_MEDIA_H + CARD_CONTENT_H + CARD_ACTIONS_H;

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: CARD_HEIGHT,
    maxHeight: CARD_HEIGHT,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[8],
    },
    position: 'relative',
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

// Иконки удобств
const amenityIcons = {
    'Бесплатный Wi-Fi': <WifiIcon fontSize="small" />,
    'Бассейн': <PoolIcon fontSize="small" />,
    'Спа': <SpaIcon fontSize="small" />,
    'Тренажерный зал': <FitnessCenterIcon fontSize="small" />,
    'Ресторан': <RestaurantIcon fontSize="small" />,
    'Парковка': <LocalParkingIcon fontSize="small" />,
    'Завтрак включен': <FreeBreakfastIcon fontSize="small" />,
};

// Работа с избранным
const getFavorites = () => JSON.parse(localStorage.getItem('favorites') || '[]');

const toggleFavorite = (id) => {
    const current = getFavorites();
    const updated = current.includes(id)
        ? current.filter(favId => favId !== id)
        : [...current, id];
    localStorage.setItem('favorites', JSON.stringify(updated));
};

export default function HotelCard({ hotel }) {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = React.useState(() => getFavorites().includes(hotel.id));

    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/600x400/eee/999?text=Фото+не+доступно';
    };

    const handleToggleFavorite = () => {
        toggleFavorite(hotel.id);
        setIsFavorite(!isFavorite);
    };

    return (
        <StyledCard>
            {/* Цена */}
            <PriceTag>
                от {hotel.price} ₽
            </PriceTag>

            {/* Кнопка избранного */}
            <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 3 }}>
                <Button onClick={handleToggleFavorite} size="small" sx={{ minWidth: 0, padding: 0 }}>
                    {isFavorite ? (
                        <FavoriteIcon color="error" />
                    ) : (
                        <FavoriteBorderIcon color="action" />
                    )}
                </Button>
            </Box>

            {/* Картинка */}
            <CardMedia
                component="img"
                height={CARD_MEDIA_H}
                image={hotel.images?.[0] || 'https://placehold.co/600x400/eee/999?text=Нет+фото'}
                alt={hotel.name}
                onError={handleImageError}
                sx={{ objectFit: 'cover', width: '100%' }}
            />

            {/* Контент */}
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
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

                {/* Адрес */}
                <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {hotel.address || `${hotel.city}, Центр города`}
                    </Typography>
                </Box>

                {/* Описание */}
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

                {/* Удобства */}
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

            {/* Кнопка перехода */}
            <Box p={2} pt={0}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/hotels/${hotel.id}`)}
                >
                    Подробнее
                </Button>
            </Box>
        </StyledCard>
    );
}
