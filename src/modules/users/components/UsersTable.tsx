import { DataTable, Button } from '@app/contracts/ui.contract';
import { TableColumn } from '@app/contracts/types.contract';
import { UserData } from '../services/users.service';
import { Edit, Trash2 } from 'lucide-react';

interface UsersTableProps {
  users: UserData[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const columns: TableColumn<UserData>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (value) => (
        <div className="font-medium text-gray-900">{String(value)}</div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => (
        <div className="text-gray-600">{String(value)}</div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
          {String(value)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            value === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {String(value)}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (value) => (
        <div className="text-gray-600 text-sm">
          {new Date(String(value)).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => console.log('Edit', row.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => console.log('Delete', row.id)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      keyExtractor={(user) => user.id}
      mobileVariant="cards"
    />
  );
};
