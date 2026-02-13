import { useEffect, useState } from 'react';
import { Card, Loader, EmptyState } from '@app/contracts/ui.contract';
import { BedDouble } from 'lucide-react';
import { RoomsToolbar } from './components/RoomsToolbar';
import { RoomsFiltersComponent } from './components/RoomsFilters';
import { RoomsTable } from './components/RoomsTable';
import { roomsService } from '../../services/rooms.service';
import { Room, RoomFilters } from '../../types/room.types';

export const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<RoomFilters>({});

  useEffect(() => {
    loadRooms();
  }, [filters]);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const data = await roomsService.getRooms(filters);
      setRooms(data);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    await loadRooms();
  };

  const handleAdd = () => {
    console.log('Add new room');
  };

  const handleEdit = (room: Room) => {
    console.log('Edit room:', room);
  };

  const handleDelete = (room: Room) => {
    console.log('Delete room:', room);
  };

  const handleBlock = (room: Room) => {
    console.log('Block room:', room);
  };

  return (
    <div>
      <RoomsToolbar
        onRefresh={handleRefresh}
        onAdd={handleAdd}
        isRefreshing={isLoading}
      />

      <RoomsFiltersComponent filters={filters} onFiltersChange={setFilters} />

      <Card padding="none">
        {isLoading ? (
          <Loader />
        ) : rooms.length === 0 ? (
          <EmptyState
            icon={<BedDouble className="h-12 w-12" />}
            title="Aucune chambre trouvée"
            description="Commencez par ajouter votre première chambre"
          />
        ) : (
          <RoomsTable
            rooms={rooms}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBlock={handleBlock}
          />
        )}
      </Card>
    </div>
  );
};
