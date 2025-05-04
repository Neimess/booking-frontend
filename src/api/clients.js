import apiClient from './apiClient';

export const getClient = (clientId) =>
  apiClient.get(`/client/${clientId}`);

export const getAllClients = () =>
  apiClient.get(`/clients`);