import apiClient from './apiClient';

export const getClientReservations = (clientId) =>
  apiClient.get(`/client/${clientId}/reservations`);

export const getBookingById = (bookingId) =>
  apiClient.get(`/booking/${bookingId}`);

export const cancelBooking = (bookingId) =>
  apiClient.delete(`/booking/${bookingId}`);

export const createBooking = (bookingData) =>
  apiClient.post(`/booking`, bookingData);

export const updateBooking = (bookingId, bookingData) =>
  apiClient.put(`/booking/${bookingId}`, bookingData);