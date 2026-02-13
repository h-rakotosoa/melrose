import { useEffect, useRef } from 'react';
import { useAuthStore } from '@core/auth/auth.store';
import { authService } from '@core/auth/auth.service';
import { jwt } from '@app/utils/jwt';
import { storage } from '@app/utils/storage';

const REFRESH_BUFFER_MS = 30000;

export const useTokenAutoRefresh = () => {
  const { accessToken, refreshToken, setTokens, logout } = useAuthStore();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const scheduleRefresh = async () => {
      if (!accessToken || !refreshToken) {
        return;
      }

      const timeUntilExpiration = jwt.getTimeUntilExpiration(accessToken);

      if (timeUntilExpiration === null) {
        return;
      }

      if (timeUntilExpiration <= REFRESH_BUFFER_MS) {
        try {
          const response = await authService.refresh(refreshToken);
          setTokens(response.accessToken, response.refreshToken || refreshToken);
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout();
        }
        return;
      }

      const refreshTime = timeUntilExpiration - REFRESH_BUFFER_MS;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          const response = await authService.refresh(refreshToken);
          setTokens(response.accessToken, response.refreshToken || refreshToken);
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout();
        }
      }, refreshTime);
    };

    scheduleRefresh();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [accessToken, refreshToken, setTokens, logout]);
};
