import apiClient from './apiClient';

export const listRooms = (hotelId) =>
  apiClient.get(`/manager/hotels/${hotelId}/rooms`);

export const getRoomById = (hotelId, roomId) =>
  apiClient.get(`/manager/hotels/${hotelId}/rooms/${roomId}`);

export const addRoom = (hotelId, roomData) =>
  apiClient.post(`/manager/hotels/${hotelId}/rooms/add`, roomData);

export const editRoom = (hotelId, roomId, roomData) =>
  apiClient.put(`/manager/hotels/${hotelId}/rooms/${roomId}`, roomData);

export const deleteRoom = (hotelId, roomId) =>
  apiClient.delete(`/manager/hotels/${hotelId}/rooms/${roomId}`);