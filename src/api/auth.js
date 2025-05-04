import apiClient from './apiClient';

/**
 * Авторизация пользователя
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} { token, user }
 */
export const login = async (username, password) => {
  const data = await apiClient.post('/auth/login', { username, password });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

/**
 * Регистрация нового пользователя
 * @param {Object} credentials – { username, password, name?, lastName?, roleType? }
 * @returns {Promise<Object>} { token, user }
 */
export const register = async (credentials) => {
  const data = await apiClient.post('/auth/register', credentials);
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

/**
 * Выход (очистка токена)
 */
export const logout = () => {
  localStorage.removeItem('token');
};

/**
 * Обновление токена
 * @returns {Promise<Object>} { token }
 */
export const refreshToken = async () => {
  const data = await apiClient.post('/auth/refresh');
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};