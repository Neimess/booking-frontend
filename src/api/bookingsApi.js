// api/bookingsApi.js
import { getMockBookings, cancelMockBooking } from '../services/mockApi';

export async function fetchMyBookings(clientId) {
  try {
    // Use our mock implementation instead of real API calls
    return await getMockBookings(clientId);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings');
  }
}

export async function cancelBooking(clientId, bookingId) {
  try {
    // Use our mock implementation instead of real API calls
    const success = await cancelMockBooking(clientId, bookingId);
    if (!success) {
      throw new Error('Failed to cancel booking');
    }
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw new Error('Failed to cancel booking');
  }
}
