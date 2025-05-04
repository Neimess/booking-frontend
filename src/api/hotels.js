import apiClient from './apiClient';

export const listHotels = () =>
  apiClient.get('/manager/hotels');

export const getHotelById = (hotelId) =>
  apiClient.get(`/manager/hotels/${hotelId}`);

export const addHotel = (hotelData) =>
  apiClient.post('/manager/hotels/add', hotelData);

export const editHotel = (hotelId, hotelData) =>
  apiClient.put(`/manager/hotels/${hotelId}`, hotelData);

export const deleteHotel = (hotelId) =>
  apiClient.delete(`/manager/hotels/${hotelId}`);