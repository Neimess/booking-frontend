import { useAuth } from '../hooks/useAuth';

class AuthService {
  constructor() {
    this.auth = useAuth();
  }

  login(username, password) {
    return this.auth.login(username, password);
  }

  register(data) {
    return this.auth.register(data);
  }

  logout() {
    return this.auth.logout();
  }

  getUser() {
    return this.auth.user;
  }
}

export default new AuthService();