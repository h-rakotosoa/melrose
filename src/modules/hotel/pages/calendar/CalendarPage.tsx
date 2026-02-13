import { useEffect, useState } from 'react';
import { Card, Loader } from '@app/contracts/ui.contract';
import { CalendarToolbar } from './components/CalendarToolbar';
import { CalendarLegend } from './components/CalendarLegend';
import { CalendarGrid } from './components/CalendarGrid';
import { calendarService } from '../../services/calendar.service';
import { CalendarDay, CalendarView } from '../../types/calendar.types';

export const CalendarPage = () => {
  const [view, setView] = useState<CalendarView>(CalendarView.DAY);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCalendar();
  }, [view, currentDate]);

  const loadCalendar = async () => {
    try {
      setIsLoading(true);
      const range = calendarService.generateDateRange(view, currentDate);
      const calendarDays = await calendarService.getCalendarDays(range);
      setDays(calendarDays);
    } catch (error) {
      console.error('Failed to load calendar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      setCurrentDate(new Date().toISOString().split('T')[0]);
      return;
    }

    const date = new Date(currentDate);
    const increment = direction === 'next' ? 1 : -1;

    switch (view) {
      case CalendarView.DAY:
        date.setDate(date.getDate() + increment);
        break;
      case CalendarView.WEEK:
        date.setDate(date.getDate() + increment * 7);
        break;
      case CalendarView.MONTH:
        date.setMonth(date.getMonth() + increment);
        break;
    }

    setCurrentDate(date.toISOString().split('T')[0]);
  };

  return (
    <div>
      <CalendarToolbar
        view={view}
        onViewChange={setView}
        currentDate={currentDate}
        onNavigate={handleNavigate}
      />

      <CalendarLegend />

      <Card>
        {isLoading ? (
          <Loader />
        ) : (
          <CalendarGrid days={days} view={view} />
        )}
      </Card>
    </div>
  );
};
