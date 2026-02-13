import { useEffect, useState } from 'react';
import { Card, Loader, EmptyState } from '@app/contracts/ui.contract';
import { UsersTable } from '../../components/UsersTable';
import { UsersToolbar } from './components/UsersToolbar';
import { Users as UsersIcon } from 'lucide-react';

export const UsersPage = () => {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active' as const,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      status: 'active' as const,
      createdAt: '2024-02-20T14:30:00Z',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'Manager',
      status: 'inactive' as const,
      createdAt: '2024-03-10T09:15:00Z',
    },
    {
      id: '4',
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      role: 'User',
      status: 'active' as const,
      createdAt: '2024-03-25T16:45:00Z',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <UsersToolbar onRefresh={handleRefresh} isRefreshing={isLoading} />

      <Card padding="none">
        {isLoading ? (
          <Loader />
        ) : users.length === 0 ? (
          <EmptyState
            icon={<UsersIcon className="h-12 w-12" />}
            title="No users found"
            description="Get started by adding your first user"
          />
        ) : (
          <UsersTable users={users} />
        )}
      </Card>
    </div>
  );
};
