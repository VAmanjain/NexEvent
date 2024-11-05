package app.server.NexEvent.services;

import app.server.NexEvent.dtos.EventsDto;
import app.server.NexEvent.entitites.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventService  {
    public Event createEvent(EventsDto eventsDto);

    public Event getEventById(Long eventId);

    public List<Event> getEventByUserProfileId(Long userId);

    public List<Event> getALlEvents();

    public List<Event> getActiveEvents();

    public List<EventsDto> getParticipatedEvents(Long userId);

    public List<EventsDto> getHostedEvents(Long userId);

    public List<EventsDto> getUpcomingEventsForUser(Long userId);

    public List<EventsDto> getEndedEventsForUser(Long userId);
}
