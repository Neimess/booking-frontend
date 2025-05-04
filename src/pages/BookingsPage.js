// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Alert,
//   Button,
// } from '@mui/material';
// import MyBookings from '../components/bookings/MyBookings';
// import {  } from '../api/bookings';

// export default function BookingsPage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const clientId = 1;

//   const loadBookings = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await fetchMyBookings(clientId);
//       setBookings(data);
//     } catch (err) {
//       console.error('Error fetching bookings:', err);
//       setError('Произошла ошибка при загрузке бронирований. Пожалуйста, попробуйте позже.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadBookings();
//   }, [clientId]);

//   const handleCancel = async (bookingId) => {
//     try {
//       setLoading(true);
//       await cancelBooking(clientId, bookingId);
//       await loadBookings();
//     } catch (err) {
//       console.error('Error cancelling booking:', err);
//       setError('Произошла ошибка при отмене бронирования. Пожалуйста, попробуйте позже.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = () => {
//     setError(null);
//     loadBookings();
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Мои бронирования
//       </Typography>

//       {error && (
//         <Box my={3}>
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//           <Button variant="contained" onClick={handleRefresh}>
//             Попробовать снова
//           </Button>
//         </Box>
//       )}

//       <Box mt={3}>
//         <MyBookings bookings={bookings} onCancel={handleCancel} isLoading={loading} />
//       </Box>
//     </Container>
//   );
// }
