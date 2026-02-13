import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
  [key: string]: unknown;
}

export const jwt = {
  decode(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  },

  isExpired(token: string): boolean {
    const decoded = this.decode(token);
    if (!decoded) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  },

  getExpirationTime(token: string): number | null {
    const decoded = this.decode(token);
    return decoded ? decoded.exp * 1000 : null;
  },

  getTimeUntilExpiration(token: string): number | null {
    const expirationTime = this.getExpirationTime(token);
    if (!expirationTime) return null;

    return expirationTime - Date.now();
  },
};
