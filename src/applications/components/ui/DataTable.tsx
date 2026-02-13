import { ReactNode } from 'react';
import { TableColumn } from '@app/contracts/types.contract';
import clsx from 'clsx';

interface DataTableProps<T extends object> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  mobileVariant?: 'cards' | 'scroll';
  emptyState?: ReactNode;
  className?: string;
}

export const DataTable = <T extends object>({
  columns,
  data,
  keyExtractor,
  mobileVariant = 'cards',
  emptyState,
  className,
}: DataTableProps<T>) => {
  if (data.length === 0 && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  if (mobileVariant === 'scroll') {
    return (
      <div className={clsx('overflow-x-auto', className)}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.className
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={keyExtractor(row)} className="hover:bg-gray-50">
                {columns.map((column) => {
                  const value = column.key in row ? row[column.key as keyof T] : null;
                  return (
                    <td
                      key={String(column.key)}
                      className={clsx('px-6 py-4 whitespace-nowrap', column.className)}
                    >
                      {column.render ? column.render(value, row) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.className
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={keyExtractor(row)} className="hover:bg-gray-50">
                {columns.map((column) => {
                  const value = column.key in row ? row[column.key as keyof T] : null;
                  return (
                    <td
                      key={String(column.key)}
                      className={clsx('px-6 py-4 whitespace-nowrap', column.className)}
                    >
                      {column.render ? column.render(value, row) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {data.map((row) => (
          <div
            key={keyExtractor(row)}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            {columns.map((column) => {
              const value = column.key in row ? row[column.key as keyof T] : null;
              return (
                <div key={String(column.key)} className="flex justify-between py-2 border-b last:border-b-0">
                  <span className="text-sm font-medium text-gray-500">
                    {column.label}
                  </span>
                  <span className="text-sm text-gray-900">
                    {column.render ? column.render(value, row) : String(value)}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
