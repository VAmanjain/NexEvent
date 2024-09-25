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

import java.util.List;
import java.util.Optional;

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
}

//package app.server.NexEvent.services.impl;
//
//import app.server.NexEvent.dtos.EventsDto;
//import app.server.NexEvent.entitites.Calendars;
//import app.server.NexEvent.entitites.Event;
//import app.server.NexEvent.entitites.UserProfile;
//import app.server.NexEvent.repository.EventRepository;
//import app.server.NexEvent.services.EventService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class EventServiceImpl implements EventService {
//
//    @Autowired
//    private EventRepository eventRepository;
//
//    @Override
//    public Event createEvent(EventsDto eventsDto) {
//        // Convert EventsDto to Event entity
//        Event event = Event.builder()
//                .name(eventsDto.getName())
//                .desc(eventsDto.getDesc())
//                .image(eventsDto.getImage())
//                .hostName(eventsDto.getHostName())
//                .type(eventsDto.getType())
//                .status(eventsDto.getStatus())
//                .approval(eventsDto.getApproval())
//                .limit(eventsDto.getLimit())
//                .cal_name(eventsDto.getCal_name())
//                .startingTime(eventsDto.getStartingTime())
//                .addressLink(eventsDto.getAddressLink())
//                .endingTime(eventsDto.getEndingTime())
//                .userProfile(UserProfile.builder().id(eventsDto.getUserProfileId()).build()) // Ensure this is set correctly
//                .calendars(Calendars.builder().id(eventsDto.getCalendarId()).build()) // Ensure this is set correctly
//                .build();
//        System.out.println("---------------------------------------------------ok---------------------------------");
//        // Save the event to the database
//        return eventRepository.save(event);
//    }
//
//    @Override
//    public Event getEventById(Long eventId) {
//        // Retrieve event by ID
//        return eventRepository.findById(eventId)
//                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));
//    }
//
//    @Override
//    public List<Event> getEventByUserProfileId(Long userId) {
//        List<Event> event = eventRepository.findByUserProfileId(userId);
//
//        return event;
//    }
//}
