import { Card } from '@app/contracts/ui.contract';
import { LoginHero } from './components/LoginHero';
import { LoginForm } from './components/LoginForm';
import { AuthLayout } from '@app/layouts/AuthLayout';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-6xl mx-auto">
        <Card padding="none" className="overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[600px]">
            <LoginHero />

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Sign In
                  </h2>
                  <p className="text-gray-600">
                    Enter your credentials to access your account
                  </p>
                </div>

                <LoginForm />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AuthLayout>
  );
};
