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
  AccordionDetails,
  useMediaQuery,
  Fade,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { format, differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';

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
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

// Components
import MapView from '../components/map/MapView';
import { getMockHotelById } from '../services/mockApi';
import ReviewCard from '../components/hotel/ReviewCard';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  height: '60vh',
  minHeight: 400,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    height: '40vh'
  },
}));

const GradientOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '60%',
  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
});

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 48,
    height: 3,
    backgroundColor: theme.palette.primary.main,
  },
}));

const PriceBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  fontSize: '1.2rem',
  padding: theme.spacing(1),
  zIndex: 1,
}));

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const data = await getMockHotelById(id);
        if (data) {
          setHotel(data);
          setActiveImage(0);
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

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut || !hotel) return 0;
    const nights = differenceInDays(checkOut, checkIn);
    return nights * hotel.price;
  };

  const totalNights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = calculateTotalPrice();

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      alert('Пожалуйста, выберите даты заезда и выезда');
      return;
    }
    navigate(`/booking/new?hotelId=${id}&checkIn=${format(checkIn, 'yyyy-MM-dd')}&checkOut=${format(checkOut, 'yyyy-MM-dd')}&guests=${guests}`);
  };

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Stack spacing={3}>
          <Skeleton variant="rectangular" height={400} />
          <Skeleton variant="rounded" height={100} />
          <Skeleton variant="rounded" height={400} />
        </Stack>
      </Container>
    );
  }

  if (error || !hotel) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Отель не найден'}
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 4 }}
          variant="outlined"
        >
          Назад
        </Button>

        {/* Hero Section */}
        <HeroSection>
          <PriceBadge label={`от ${hotel.price} ₽ / ночь`} />
          <Fade in timeout={500}>
            <Box
              sx={{
                height: '100%',
                backgroundImage: `url(${hotel.images?.[activeImage] || 'https://placehold.co/600x400'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <GradientOverlay />
              <Box
                position="absolute"
                bottom={24}
                left={24}
                color="common.white"
              >
                <Typography variant="h2" fontWeight={700} gutterBottom>
                  {hotel.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Rating
                    value={hotel.rating}
                    precision={0.5}
                    readOnly
                    size="large"
                    icon={<StarIcon fontSize="inherit" />}
                  />
                  <Typography variant="h6">
                    {hotel.rating} ({hotel.reviewCount} отзывов)
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1} gap={1}>
                  <LocationOnIcon />
                  <Typography variant="h6">
                    {hotel.address || `${hotel.city}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Fade>
        </HeroSection>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Image Gallery */}
            <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 3 }}>
              <SectionHeader variant="h5">Фотографии отеля</SectionHeader>
              <ImageList cols={3} gap={16} variant="masonry">
                {hotel.images?.map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveImage(index)}
                  >
                    <ImageListItem sx={{ cursor: 'pointer' }}>
                      <img
                        src={img}
                        alt={`${hotel.name} ${index + 1}`}
                        style={{
                          borderRadius: 8,
                          height: 200,
                          objectFit: 'cover',
                        }}
                      />
                    </ImageListItem>
                  </motion.div>
                ))}
              </ImageList>
            </Paper>

            {/* Description */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
              <SectionHeader variant="h5">Описание</SectionHeader>
              <Typography variant="body1" paragraph>
                {hotel.description}
              </Typography>
            </Paper>

            {/* Amenities */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
              <SectionHeader variant="h5">Удобства</SectionHeader>
              <Grid container spacing={2}>
                {hotel.amenities?.map((amenity) => (
                  <Grid item xs={6} sm={4} key={amenity}>
                    <Box display="flex" alignItems="center" gap={2} p={1}>
                      <Box color="primary.main">
                        {amenityIcons[amenity] || <PhotoCameraBackIcon />}
                      </Box>
                      <Typography>{amenity}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Reviews */}
            {hotel.reviews?.length > 0 && (
              <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <SectionHeader variant="h5">Отзывы</SectionHeader>
                <Stack spacing={3}>
                  {hotel.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Location Map */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
              <SectionHeader variant="h5">Расположение</SectionHeader>
              <Box sx={{ height: 400, borderRadius: 2, overflow: 'hidden' }}>
                <MapView
                  points={[{
                    id: hotel.id,
                    coords: [hotel.lat || 55.7558, hotel.lng || 37.6173],
                    label: hotel.name
                  }]}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Booking Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 100, borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <DatePicker
                        label="Заезд"
                        value={checkIn}
                        onChange={setCheckIn}
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
                    <Grid item xs={12}>
                      <DatePicker
                        label="Выезд"
                        value={checkOut}
                        onChange={setCheckOut}
                        minDate={checkIn || new Date()}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: 'outlined',
                            size: 'small'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        label="Гости"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        SelectProps={{ native: true }}
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'гость' : 'гостя'}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </LocalizationProvider>

                {totalNights > 0 && (
                  <Box mt={3}>
                    <Stack spacing={1}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography>{totalNights} ночей</Typography>
                        <Typography>{hotel.price * totalNights} ₽</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography>Сборы</Typography>
                        <Typography>{Math.round(totalPrice * 0.1)} ₽</Typography>
                      </Box>
                      <Divider />
                      <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography variant="h6">Итого</Typography>
                        <Typography variant="h6" color="primary">
                          {totalPrice + Math.round(totalPrice * 0.1)} ₽
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleBookNow}
                  disabled={!checkIn || !checkOut}
                >
                  Забронировать
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
};

export default HotelDetailPage;