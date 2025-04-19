// src/api.js
const API_BASE = 'https://booking';

async function fetchAvailableHotels(startDate, endDate) {
  const url = new URL(`${API_BASE}/api/search/hotels/available`);
  if (startDate) url.searchParams.set('startDate', startDate);
  if (endDate)   url.searchParams.set('endDate', endDate);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fetch available hotels failed');
  return res.json();
}

async function fetchRooms(hotelId) {
  const res = await fetch(`${API_BASE}/api/search/hotels/${hotelId}/information`);
  if (!res.ok) throw new Error('Fetch rooms failed');
  return res.json();
}

async function fetchMyBookings(clientId) {
  const res = await fetch(`${API_BASE}/api/client/${clientId}/reservations`);
  if (!res.ok) throw new Error('Fetch my bookings failed');
  return res.json();
}

async function cancelBooking(clientId, bookingId) {
  const res = await fetch(
    `${API_BASE}/api/client/${clientId}/reservations/${bookingId}`, 
    { method: 'DELETE' }
  );
  if (!res.ok) throw new Error('Cancel booking failed');
}

// Собираем всё в объект
const api = {
  fetchAvailableHotels,
  fetchRooms,
  fetchMyBookings,
  cancelBooking
};

// Экспортируем переменную, а не литерал
export default api;
