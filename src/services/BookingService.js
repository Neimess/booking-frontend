import { useFetch } from '../hooks/useFetch';
import { bookings } from '../api';

class BookingService {
  /**
   * Хук получения бронирований клиента
   * @param {number|string} clientId
   */
  useClientReservations(clientId) {
    return useFetch(() => bookings.getClientReservations(clientId), [clientId]);
  }

  cancelBooking(bookingId) {
    return bookings.cancelBooking(bookingId);
  }

  createBooking(data) {
    return bookings.createBooking(data);
  }

  updateBooking(id, data) {
    return bookings.updateBooking(id, data);
  }
}

export default new BookingService();