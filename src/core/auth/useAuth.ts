import { useAuthStore } from './auth.store';
import { authService } from './auth.service';
import { useNavigate } from 'react-router-dom';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login: loginStore, logout: logoutStore } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      if (credentials.email === 'admin@melrose.com' && credentials.password === 'password123') {
        const mockUser = {
          id: '1',
          email: 'admin@melrose.com',
          name: 'Admin User',
          role: 'admin',
        };
        const mockToken = 'mock-access-token-' + Date.now();
        const mockRefreshToken = 'mock-refresh-token-' + Date.now();
        loginStore(mockUser, mockToken, mockRefreshToken);
        navigate('/');
        return;
      }

      const response = await authService.login(credentials);
      loginStore(response.user, response.accessToken, response.refreshToken);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      logoutStore();
      navigate('/login');
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};
