import { Users, Baby } from 'lucide-react';

interface RoomCapacityBadgeProps {
  adults: number;
  children: number;
  className?: string;
}

export const RoomCapacityBadge = ({
  adults,
  children,
  className = '',
}: RoomCapacityBadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-1 text-sm text-gray-700">
        <Users className="h-4 w-4" />
        <span>{adults}</span>
      </div>
      {children > 0 && (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <Baby className="h-4 w-4" />
          <span>{children}</span>
        </div>
      )}
    </div>
  );
};
