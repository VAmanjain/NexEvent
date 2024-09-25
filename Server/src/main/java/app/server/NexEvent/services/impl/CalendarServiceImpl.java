package app.server.NexEvent.services.impl;

import app.server.NexEvent.dtos.CalendarDto;
import app.server.NexEvent.entitites.Calendars;
import app.server.NexEvent.mapper.CalendraMapper;
import app.server.NexEvent.repository.CalendarsRepository;
import app.server.NexEvent.services.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CalendarServiceImpl implements CalendarService {

    @Autowired
    CalendarsRepository calendarsRepository;

    @Override
    public Calendars addcalendars(CalendarDto calendarDto) {
        Calendars calendar = CalendraMapper.mapToCalendra(calendarDto);
        calendarsRepository.save(calendar);
        return calendar;
    }

    @Override
    public List<CalendarDto> getCalendarsByUserProfile(Long userId) {

        List<Calendars> userCalendars = calendarsRepository.findByUserProfileId(userId);

        // Map the list of Calendars to CalendarDto
        List<CalendarDto> calendarDtos = userCalendars.stream()
                .map(CalendraMapper::mapToCalendarDto) // Assuming mapToCalendarDto is a static method
                .collect(Collectors.toList());
        return calendarDtos;
    }
}
