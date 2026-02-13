import { Button } from '@app/contracts/ui.contract';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { CalendarView } from '../../../types/calendar.types';

interface CalendarToolbarProps {
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  currentDate: string;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
}

export const CalendarToolbar = ({
  view,
  onViewChange,
  currentDate,
  onNavigate,
}: CalendarToolbarProps) => {
  const formatDate = () => {
    const date = new Date(currentDate);
    return date.toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
        <p className="text-sm text-gray-600 mt-1">{formatDate()}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('prev')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onNavigate('today')}>
          <Calendar className="h-4 w-4 mr-1" />
          Aujourd'hui
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onNavigate('next')}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="flex gap-1 ml-2">
          <Button
            variant={view === CalendarView.DAY ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange(CalendarView.DAY)}
          >
            Jour
          </Button>
          <Button
            variant={view === CalendarView.WEEK ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange(CalendarView.WEEK)}
          >
            Semaine
          </Button>
          <Button
            variant={view === CalendarView.MONTH ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange(CalendarView.MONTH)}
          >
            Mois
          </Button>
        </div>
      </div>
    </div>
  );
};
