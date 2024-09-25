package app.server.NexEvent.controller;

import app.server.NexEvent.dtos.CalendarDto;
import app.server.NexEvent.entitites.Calendars;
import app.server.NexEvent.mapper.CalendraMapper;
import app.server.NexEvent.services.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/calendar")
public class CalendarController {

    @Autowired
    CalendarService calendarService;

    @PostMapping
    public ResponseEntity<CalendarDto> addCalendar(@RequestBody CalendarDto calendarDto){
        Calendars calendar = calendarService.addcalendars(calendarDto);
        CalendarDto savedCalendar = CalendraMapper.mapToCalendarDto(calendar);
        return new ResponseEntity<>(savedCalendar, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<List<CalendarDto>> getCalendarByUserProfile(@PathVariable("id") Long userProfileId) {
        List<CalendarDto> userCalendars = calendarService.getCalendarsByUserProfile(userProfileId);

        if (userCalendars.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if no calendars are found
        }

        return ResponseEntity.ok(userCalendars); // Return the list of calendars
    }
}
