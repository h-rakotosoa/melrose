import { Card } from '@app/contracts/ui.contract';
import { DashboardHeader } from './components/DashboardHeader';
import { Users, Activity, TrendingUp, Database } from 'lucide-react';

export const DashboardPage = () => {
  const stats = [
    {
      label: 'Total Users',
      value: '2,543',
      icon: Users,
      change: '+12%',
      trend: 'up',
    },
    {
      label: 'Active Sessions',
      value: '1,234',
      icon: Activity,
      change: '+5%',
      trend: 'up',
    },
    {
      label: 'Growth Rate',
      value: '23.5%',
      icon: TrendingUp,
      change: '+2.5%',
      trend: 'up',
    },
    {
      label: 'Data Usage',
      value: '45.2 GB',
      icon: Database,
      change: '-3%',
      trend: 'down',
    },
  ];

  return (
    <div>
      <DashboardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                action: 'User registered',
                user: 'john.doe@example.com',
                time: '2 minutes ago',
              },
              {
                action: 'Data exported',
                user: 'jane.smith@example.com',
                time: '15 minutes ago',
              },
              {
                action: 'Settings updated',
                user: 'admin@melrose.com',
                time: '1 hour ago',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-2"
              >
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
