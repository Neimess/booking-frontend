import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Box,
    Paper,
    Typography,
    Button,
    Divider,
    Chip,
    Stack,
    Rating,
    ImageList,
    ImageListItem,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { format, differenceInDays } from 'date-fns';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import SpaIcon from '@mui/icons-material/Spa';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Components
import MapView from '../components/map/MapView';
import { getMockHotelById } from '../services/mockApi';

// Styled components
const MainImage = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 400,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
        height: 300,
    },
}));

// Amenity icons mapping
const amenityIcons = {
    'Бесплатный Wi-Fi': <WifiIcon />,
    'Бассейн': <PoolIcon />,
    'Спа': <SpaIcon />,
    'Тренажерный зал': <FitnessCenterIcon />,
    'Ресторан': <RestaurantIcon />,
    'Парковка': <LocalParkingIcon />,
    'Завтрак включен': <FreeBreakfastIcon />,
};

const HotelDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(2);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                setLoading(true);
                const data = await getMockHotelById(id);
                if (data) {
                    setHotel(data);
                } else {
                    setError('Отель не найден');
                }
            } catch (err) {
                console.error('Error fetching hotel details:', err);
                setError('Произошла ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    // Calculate total nights and price
    const calculateTotalPrice = () => {
        if (!checkIn || !checkOut || !hotel) return 0;

        const nights = differenceInDays(checkOut, checkIn);
        return nights * hotel.price;
    };

    const totalNights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
    const totalPrice = calculateTotalPrice();

    // Handle booking
    const handleBookNow = () => {
        if (!checkIn || !checkOut) {
            alert('Пожалуйста, выберите даты заезда и выезда');
            return;
        }

        // In a real app, would call an API to create a booking
        // For now, just navigate to a booking confirmation page
        navigate(`/booking/new?hotelId=${id}&checkIn=${format(checkIn, 'yyyy-MM-dd')}&checkOut=${format(checkOut, 'yyyy-MM-dd')}&guests=${guests}`);
    };

    // Go back to search results
    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <Container sx={{ py: 8, textAlign: 'center' }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Загрузка информации об отеле...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 8 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    variant="contained"
                >
                    Вернуться к поиску
                </Button>
            </Container>
        );
    }

    if (!hotel) {
        return (
            <Container sx={{ py: 8 }}>
                <Alert severity="warning">
                    Отель не найден
                </Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Вернуться к поиску
                </Button>
            </Container>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Back button */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={{ mb: 2 }}
                >
                    Назад к результатам
                </Button>

                {/* Hotel Title */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        {hotel.name}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Rating
                            value={parseFloat(hotel.rating) || 0}
                            precision={0.5}
                            readOnly
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            {hotel.rating} ({hotel.reviewCount} отзывов)
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                        <LocationOnIcon color="action" sx={{ mr: 0.5 }} />
                        <Typography variant="body1" color="text.secondary">
                            {hotel.address || `${hotel.city}, Центр города`}
                        </Typography>
                    </Box>
                </Box>

                {/* Main content */}
                <Grid container spacing={4}>
                    {/* Left column - Hotel details */}
                    <Grid item xs={12} md={8}>
                        {/* Main image */}
                        <MainImage
                            sx={{
                                backgroundImage: `url(${hotel.images?.[0] || 'https://placehold.co/600x400/eee/999?text=Фото+не+доступно'})`
                            }}
                        />

                        {/* Gallery */}
                        <ImageList cols={3} gap={8} sx={{ mb: 3 }}>
                            {hotel.images?.map((img, index) => (
                                <ImageListItem key={index}>
                                    <img
                                        src={img}
                                        alt={`${hotel.name} photo ${index + 1}`}
                                        style={{ borderRadius: 8, height: 120, objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/600x400/eee/999?text=Фото+не+доступно';
                                        }}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>

                        {/* Description */}
                        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Описание
                            </Typography>
                            <Typography variant="body1">
                                {hotel.description}
                            </Typography>

                            {/* Amenities */}
                            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                                Удобства
                            </Typography>
                            <Grid container spacing={2}>
                                {hotel.amenities?.map((amenity) => (
                                    <Grid item xs={12} sm={6} md={4} key={amenity}>
                                        <Box display="flex" alignItems="center">
                                            {amenityIcons[amenity] || null}
                                            <Typography variant="body1" sx={{ ml: 1 }}>
                                                {amenity}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>

                        {/* Map */}
                        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Расположение
                            </Typography>
                            <Box sx={{ height: 300, borderRadius: 1, overflow: 'hidden' }}>
                                <MapView
                                    points={hotel ? [{
                                        id: hotel.id,
                                        coords: [hotel.lat || 55.7558, hotel.lng || 37.6173],
                                        label: hotel.name
                                    }] : []}
                                />
                            </Box>
                        </Paper>

                        {/* FAQs */}
                        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Часто задаваемые вопросы
                            </Typography>

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Какое время заезда и выезда?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Стандартное время заезда в отель: с 14:00. Выезд: до 12:00. Возможен ранний заезд или поздний выезд по предварительной договоренности с отелем.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Есть ли парковка?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {hotel.amenities?.includes('Парковка')
                                            ? 'Да, отель предоставляет парковку для гостей.'
                                            : 'К сожалению, у отеля нет собственной парковки.'}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Можно ли отменить бронирование?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Бронирование можно отменить бесплатно за 24 часа до заезда. При более поздней отмене может взиматься плата в размере стоимости первых суток проживания.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Grid>

                    {/* Right column - Booking form */}
                    <Grid item xs={12} md={4}>
                        <Card elevation={3} sx={{ borderRadius: 2, position: 'sticky', top: 100 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                                    от {hotel.price} ₽ <Typography component="span" variant="body2">/ ночь</Typography>
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                {/* Dates */}
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                    Выберите даты
                                </Typography>

                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={6}>
                                        <DatePicker
                                            label="Заезд"
                                            value={checkIn}
                                            onChange={setCheckIn}
                                            format="dd.MM.yyyy"
                                            minDate={new Date()}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    size: 'small'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <DatePicker
                                            label="Выезд"
                                            value={checkOut}
                                            onChange={setCheckOut}
                                            format="dd.MM.yyyy"
                                            minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    size: 'small'
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Guests */}
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                    Количество гостей
                                </Typography>

                                <TextField
                                    select
                                    label="Гости"
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                    size="small"
                                    sx={{ mb: 3 }}
                                >
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <option key={num} value={num}>
                                            {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
                                        </option>
                                    ))}
                                </TextField>

                                {/* Price calculation */}
                                {checkIn && checkOut && totalNights > 0 && (
                                    <Box sx={{ mb: 3 }}>
                                        <Divider sx={{ my: 2 }} />
                                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                            <Typography variant="body2">
                                                {hotel.price} ₽ x {totalNights} {totalNights === 1 ? 'ночь' : totalNights < 5 ? 'ночи' : 'ночей'}
                                            </Typography>
                                            <Typography variant="body2">
                                                {hotel.price * totalNights} ₽
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                            <Typography variant="body2">
                                                Сервисный сбор
                                            </Typography>
                                            <Typography variant="body2">
                                                {Math.round(hotel.price * totalNights * 0.1)} ₽
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ my: 2 }} />
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                Итого
                                            </Typography>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {totalPrice + Math.round(totalPrice * 0.1)} ₽
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

                                {/* Booking button */}
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    onClick={handleBookNow}
                                    disabled={!checkIn || !checkOut || totalNights <= 0}
                                    sx={{ mt: 2 }}
                                >
                                    Забронировать
                                </Button>

                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                                    Оплата производится при заселении
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
    );
};

export default HotelDetailPage; 