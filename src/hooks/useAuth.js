import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authValue = useProvideAuth();
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.refreshToken()
        .then(({ token: newToken, user }) => {
          localStorage.setItem('token', newToken);
          setUser(user);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { token, user } = await auth.login(username, password);
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials) => {
    setLoading(true);
    try {
      const { token, user } = await auth.register(credentials);
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
}