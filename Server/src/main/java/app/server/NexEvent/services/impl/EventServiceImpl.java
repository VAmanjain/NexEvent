package app.server.NexEvent.services.impl;

import app.server.NexEvent.dtos.EventsDto;
import app.server.NexEvent.dtos.HostDto;
import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.entitites.Hosts;
import app.server.NexEvent.entitites.UserProfile;
import app.server.NexEvent.mapper.EventMapper;
import app.server.NexEvent.mapper.HostsMapper;
import app.server.NexEvent.repository.EventRepository;
import app.server.NexEvent.repository.HostsRepository;
import app.server.NexEvent.repository.UserProfileRepository;
import app.server.NexEvent.services.EventService;
import app.server.NexEvent.services.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private HostsRepository hostsRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Override
    public Event createEvent(EventsDto eventsDto) {
        System.out.println("------------------------------------ok dto------------------------");
        Event event = EventMapper.mapToEvent(eventsDto);

        System.out.println("Host ID: "+ eventsDto.getHosts().getFirst().getEventId());
        // Assuming eventsDto is already defined and populated
        List<HostDto> hosts = eventsDto.getHosts();
        if (hosts != null && !hosts.isEmpty()) {
            HostDto firstHost = hosts.get(0);
            List<UserProfile> userProfile = userProfileRepository.findByUsername(firstHost.getName());
            // Proceed with your logic using userProfile
        } else {
            // Handle the case where hosts is null or empty
            throw new IllegalArgumentException("Hosts list is null or empty");
        }
//        UserProfile userProfile = userProfileRepository.findByUsername(eventsDto.getHosts().get(0).getName());

//        Hosts hosts = HostsMapper.mapToHost(userProfile, eventsDto.getId());

        System.out.println("------------------------------------------------------------------------------------------------------------------------------------------------------");
        System.out.println(event);
        eventRepository.save(event);

//        hostsRepository.save(hosts);
        return event;
    }

    @Override
    public Event getEventById(Long eventId) {


        Event getEvent = eventRepository.getReferenceById(eventId);

        return getEvent;
    }

    @Override
    public List<Event> getEventByUserProfileId(Long userId) {
        List<Event> event = eventRepository.findByUserProfileId(userId);

        return event;}

    @Override
    public List<Event> getALlEvents() {
        List<Event> events = eventRepository.findAll();
        return events;
    }

    public List<Event> getActiveEvents() {
        LocalDateTime now = LocalDateTime.now();
        return eventRepository.findByIsPrivateFalseAndStartingTimeAfterOrEndingTimeGreaterThan(now, now);
    }

    @Override
    public List<EventsDto> getParticipatedEvents(Long userId) {
        List<Event> allEvents = eventRepository.findAll();

        return allEvents.stream()
                .filter(event -> event.getGuests().stream()
                        .anyMatch(guest -> guest.getGuestId().equals(userId)))
                .map(EventMapper::mapToEventsDto)
                .sorted(Comparator.comparing(EventsDto::getStartingTime).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<EventsDto> getHostedEvents(Long userId) {
        List<Event> allEvents = eventRepository.findAll();

        return allEvents.stream()
                .filter(event -> event.getUserProfile() != null &&
                        event.getUserProfile().getId().equals(userId))
                .map(EventMapper::mapToEventsDto)
                .sorted(Comparator.comparing(EventsDto::getStartingTime).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<EventsDto> getUpcomingEventsForUser(Long userId) {
        // Fetch all upcoming events from the repository
        List<Event> allUpcomingEvents = eventRepository.findAllByStartingTimeAfter(LocalDateTime.now());

        // Filter events based on user participation (this depends on your data model)
        List<EventsDto> userUpcomingEvents = new ArrayList<>();
        for (Event event : allUpcomingEvents) {
            if (event.getGuests().stream().anyMatch(guest -> guest.getGuestId().equals(userId))) {
                userUpcomingEvents.add(EventMapper.mapToEventsDto(event)); // Convert to DTO if necessary
            }
        }

        return userUpcomingEvents;
    }

    @Override
    public List<EventsDto> getEndedEventsForUser(Long userId) {
        // Fetch all ended events from the repository
        List<Event> allEndedEvents = eventRepository.findAllByEndingTimeBefore(LocalDateTime.now());

        // Filter events based on user participation
        List<EventsDto> userEndedEvents = new ArrayList<>();
        for (Event event : allEndedEvents) {
            if (event.getGuests().stream().anyMatch(guest -> guest.getGuestId().equals(userId))) {
                userEndedEvents.add(EventMapper.mapToEventsDto(event)); // Convert to DTO if necessary
            }
        }

        return userEndedEvents;
    }
}



