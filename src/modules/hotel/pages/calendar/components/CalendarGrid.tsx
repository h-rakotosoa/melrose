import { CalendarDay, CalendarView } from '../../../types/calendar.types';
import { StatusPill } from '../../../components/StatusPill';

interface CalendarGridProps {
  days: CalendarDay[];
  view: CalendarView;
}

export const CalendarGrid = ({ days, view }: CalendarGridProps) => {
  if (days.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        Aucune réservation pour cette période
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid gap-4">
        {days.map((day) => (
          <div
            key={day.date}
            className={`p-4 rounded-lg border ${
              day.isToday
                ? 'border-blue-500 bg-blue-50'
                : day.isWeekend
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900">
                {new Date(day.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </h3>
              {day.isToday && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  Aujourd'hui
                </span>
              )}
            </div>
            {day.events.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune réservation</p>
            ) : (
              <div className="space-y-2">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 bg-white rounded border border-gray-200 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">
                          {event.guestName}
                        </div>
                        <div className="text-sm text-gray-600">
                          Chambre {event.roomNumber}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <StatusPill status={event.status} type="reservation" />
                        {event.isCheckInDay && (
                          <span className="text-xs text-green-600 font-medium">
                            Arrivée
                          </span>
                        )}
                        {event.isCheckOutDay && (
                          <span className="text-xs text-orange-600 font-medium">
                            Départ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
