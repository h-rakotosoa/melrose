import { useEffect } from 'react';
import { AppRouter } from './routes/router';
import { useAuthStore } from '@core/auth/auth.store';
import { useTokenAutoRefresh } from '@app/hooks/useTokenAutoRefresh';
import { Loader } from '@app/components/ui/Loader';

function App() {
  const hydrateFromStorage = useAuthStore((state) => state.hydrateFromStorage);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useTokenAutoRefresh();

  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  return <AppRouter />;
}

export default App;
