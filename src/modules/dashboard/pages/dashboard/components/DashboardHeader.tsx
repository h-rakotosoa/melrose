import { useAuth } from '@core/auth/useAuth';

export const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {user?.name || 'User'}
      </h1>
      <p className="text-gray-600">
        Here's what's happening with your account today
      </p>
    </div>
  );
};
