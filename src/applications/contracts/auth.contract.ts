import { User } from './types.contract';

export interface AuthContract {
  getAccessToken(): string | null;
  getUser(): User | null;
  isAuthenticated(): boolean;
  logout(): void;
}

export const createAuthContract = (
  getAccessToken: () => string | null,
  getUser: () => User | null,
  isAuthenticated: () => boolean,
  logout: () => void
): AuthContract => {
  return {
    getAccessToken,
    getUser,
    isAuthenticated,
    logout,
  };
};
