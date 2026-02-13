import { useEffect, useState } from 'react';
import { Card, Loader, EmptyState } from '@app/contracts/ui.contract';
import { ClipboardList } from 'lucide-react';
import { ReservationsToolbar } from './components/ReservationsToolbar';
import { ReservationsFiltersComponent } from './components/ReservationsFilters';
import { ReservationsTable } from './components/ReservationsTable';
import { reservationsService } from '../../services/reservations.service';
import { Reservation, ReservationFilters } from '../../types/reservation.types';
import { ReservationStatus } from '../../types/enums';

export const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ReservationFilters>({});

  useEffect(() => {
    loadReservations();
  }, [filters]);

  const loadReservations = async () => {
    try {
      setIsLoading(true);
      const data = await reservationsService.getReservations(filters);
      setReservations(data);
    } catch (error) {
      console.error('Failed to load reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    await loadReservations();
  };

  const handleAdd = () => {
    console.log('Add new reservation');
  };

  const handleEdit = (reservation: Reservation) => {
    console.log('Edit reservation:', reservation);
  };

  const handleCancel = async (reservation: Reservation) => {
    if (confirm('Voulez-vous vraiment annuler cette réservation ?')) {
      try {
        await reservationsService.updateReservation(reservation.id, {
          status: ReservationStatus.CANCELLED,
        });
        await loadReservations();
      } catch (error) {
        console.error('Failed to cancel reservation:', error);
      }
    }
  };

  const handleCheckIn = async (reservation: Reservation) => {
    try {
      await reservationsService.updateReservation(reservation.id, {
        status: ReservationStatus.CHECKED_IN,
      });
      await loadReservations();
    } catch (error) {
      console.error('Failed to check-in:', error);
    }
  };

  const handleCheckOut = async (reservation: Reservation) => {
    try {
      await reservationsService.updateReservation(reservation.id, {
        status: ReservationStatus.CHECKED_OUT,
      });
      await loadReservations();
    } catch (error) {
      console.error('Failed to check-out:', error);
    }
  };

  return (
    <div>
      <ReservationsToolbar
        onRefresh={handleRefresh}
        onAdd={handleAdd}
        isRefreshing={isLoading}
      />

      <ReservationsFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
      />

      <Card padding="none">
        {isLoading ? (
          <Loader />
        ) : reservations.length === 0 ? (
          <EmptyState
            icon={<ClipboardList className="h-12 w-12" />}
            title="Aucune réservation trouvée"
            description="Commencez par créer votre première réservation"
          />
        ) : (
          <ReservationsTable
            reservations={reservations}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        )}
      </Card>
    </div>
  );
};
