package app.server.NexEvent.services;

import app.server.NexEvent.dtos.CalendarDto;
import app.server.NexEvent.entitites.Calendars;

import java.util.List;

public interface CalendarService {
    public Calendars addcalendars(CalendarDto calendarDto);

    public List<CalendarDto> getCalendarsByUserProfile(Long userId);
}
