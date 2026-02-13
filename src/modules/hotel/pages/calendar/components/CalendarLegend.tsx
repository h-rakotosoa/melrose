import { StatusPill } from '../../../components/StatusPill';
import { ReservationStatus, RoomStatus } from '../../../types/enums';

export const CalendarLegend = () => {
  return (
    <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Légende</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-2">
          <StatusPill status={ReservationStatus.CONFIRMED} type="reservation" />
        </div>
        <div className="flex items-center gap-2">
          <StatusPill status={ReservationStatus.CHECKED_IN} type="reservation" />
        </div>
        <div className="flex items-center gap-2">
          <StatusPill status={RoomStatus.FREE} type="room" />
        </div>
        <div className="flex items-center gap-2">
          <StatusPill status={RoomStatus.OCCUPIED} type="room" />
        </div>
      </div>
    </div>
  );
};
