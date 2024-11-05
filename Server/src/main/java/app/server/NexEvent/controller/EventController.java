package app.server.NexEvent.controller;


import app.server.NexEvent.dtos.EventsDto;
import app.server.NexEvent.dtos.UpdateUserProfileDto;
import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.mapper.EventMapper;
import app.server.NexEvent.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<EventsDto> createEvent(@RequestBody EventsDto eventsDto){
        System.out.println(eventsDto);
        Event event = eventService.createEvent(eventsDto);
        System.out.println("-------------------------------------------OK-------------------------------");
        EventsDto createdEvent = EventMapper.mapToEventsDto(event);
        System.out.println(createdEvent);
        return new ResponseEntity(createdEvent, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public  ResponseEntity<EventsDto> getEventById (@PathVariable("id") Long eventId){
        Event event = eventService.getEventById(eventId);

        EventsDto findingEvent = EventMapper.mapToEventsDto(event);

        return ResponseEntity.ok(findingEvent);

    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<EventsDto>> getEventByUserProfile(@PathVariable("id") Long userId) {
        // Fetch the list of events for the user
        List<Event> events = eventService.getEventByUserProfileId(userId);

        // Map each event to EventsDto using the mapToEventsDto method
        List<EventsDto> eventDtos = events.stream()
                .map(EventMapper::mapToEventsDto)  // Apply the mapping for each event
                .collect(Collectors.toList());     // Collect the result into a List

        return ResponseEntity.ok(eventDtos); // Return the list of EventsDto objects
    }


    @GetMapping("/all")
    public ResponseEntity<List<EventsDto>> getALlEvents(){
        List<Event> events = eventService.getALlEvents();
        List<EventsDto> eventDtos = events.stream()
                .map(EventMapper::mapToEventsDto)  // Apply the mapping for each event
                .collect(Collectors.toList());     // Collect the result into a List

        return ResponseEntity.ok(eventDtos);
    }


    @GetMapping("/active")
    public List<EventsDto> getActiveEvents() {
        List<Event> activeEvents = eventService.getActiveEvents();
        return activeEvents.stream()
                .map(EventMapper::mapToEventsDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/user/participated")
    public ResponseEntity<List<EventsDto>> getParticipatedEvents(@RequestParam Long userId) {
        List<EventsDto> events = eventService.getParticipatedEvents(userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/user/hosted")
    public ResponseEntity<List<EventsDto>> getHostedEvents(@RequestParam Long userId) {
        List<EventsDto> events = eventService.getHostedEvents(userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/user/upcoming")
    public ResponseEntity<List<EventsDto>> getUpcomingEventsForUser(@RequestParam Long userId) {
        List<EventsDto> upcomingEvents = eventService.getUpcomingEventsForUser(userId);
        return ResponseEntity.ok(upcomingEvents);
    }

    @GetMapping("/user/past")
    public ResponseEntity<List<EventsDto>> getEndedEventsForUser(@RequestParam Long userId) {
        List<EventsDto> endedEvents = eventService.getEndedEventsForUser(userId);
        return ResponseEntity.ok(endedEvents);
    }
}
