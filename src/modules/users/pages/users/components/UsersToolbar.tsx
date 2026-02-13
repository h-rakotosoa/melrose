import { Button } from '@app/contracts/ui.contract';
import { Plus, RefreshCw } from 'lucide-react';

interface UsersToolbarProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const UsersToolbar = ({ onRefresh, isRefreshing }: UsersToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-1">Manage your application users</p>
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        <Button
          variant="secondary"
          onClick={onRefresh}
          isLoading={isRefreshing}
          className="flex-1 sm:flex-initial"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button className="flex-1 sm:flex-initial">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
    </div>
  );
};
