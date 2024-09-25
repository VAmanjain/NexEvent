package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.EventsDto;
import app.server.NexEvent.entitites.*;
import org.springframework.stereotype.Component;


import app.server.NexEvent.dtos.EventsDto;
import app.server.NexEvent.dtos.HostDto; // Import HostDto
import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.entitites.Hosts; // Import Hosts
import app.server.NexEvent.entitites.UserProfile;
import app.server.NexEvent.entitites.Calendars;
import app.server.NexEvent.entitites.Guests;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EventMapper {

    public static Event mapToEvent(EventsDto eventsDto) {
        if (eventsDto == null) {
            System.out.println("-------------------------Dto issue--------------");
            return null;
        }

        System.out.println("----------------Dto builder--------------------");
        // Map the Event object
        Event event = Event.builder()
                .id(eventsDto.getId())
                .name(eventsDto.getName())
                .desc(eventsDto.getDesc())
                .image(eventsDto.getImage())
                .addressLink(eventsDto.getAddressLink())
                .hostName(eventsDto.getHostName())
                .cal_name(eventsDto.getCal_name())
                .startingTime(eventsDto.getStartingTime())
                .endingTime(eventsDto.getEndingTime())
                .approval(eventsDto.getApproval())
                .type(eventsDto.getType())
                .limit(eventsDto.getLimit())
                .status(eventsDto.getStatus())
                .address(eventsDto.getAddress() != null ? eventsDto.getAddress() : null)
                .userProfile(eventsDto.getUserProfileId() != null ? UserProfile.builder().id(eventsDto.getUserProfileId()).build() : null)
                .calendars(eventsDto.getCalendarId() != null ? Calendars.builder().id(eventsDto.getCalendarId()).build() : null)
                .hosts(mapToHostsList(eventsDto.getHosts())) // Map the list of hosts
                .guests(mapToGuestsList(eventsDto.getGuestIds())) // Map the list of guests
                .build();
        System.out.println("---------------Dto builder okk--------------------");
        return event;
    }

    // Helper method to map List<HostDto> to List<Hosts>
    private static List<Hosts> mapToHostsList(List<HostDto> hostDtos) {
        if (hostDtos == null) {
            return null;
        }
        return hostDtos.stream()
                .map(hostDto -> Hosts.builder()
                        .id(hostDto.getId())
                        .name(hostDto.getName())
                        .email(hostDto.getEmail())
                        .role(hostDto.getRole())
                        .event(hostDto.getEventId() != null ? Event.builder().id(hostDto.getEventId()).build() : null) // Set event using eventId
                        .build())
                .collect(Collectors.toList());
    }

    // Helper method to map List<Long> to List<Guests>
    private static List<Guests> mapToGuestsList(List<Long> guestIds) {
        if (guestIds == null) {
            return null;
        }
        return guestIds.stream()
                .map(id -> Guests.builder().id(id).build())
                .collect(Collectors.toList());
    }

    public static EventsDto mapToEventsDto(Event event) {
        if (event == null) {
            return null;
        }

        // Map the EventsDto object
        EventsDto eventsDto = EventsDto.builder()
                .id(event.getId())
                .name(event.getName())
                .image(event.getImage())
                .desc(event.getDesc())
                .addressLink(event.getAddressLink())
                .hostName(event.getHostName())
                .cal_name(event.getCal_name())
                .startingTime(event.getStartingTime())
                .endingTime(event.getEndingTime())
                .approval(event.getApproval())
                .type(event.getType())
                .limit(event.getLimit())
                .status(event.getStatus())
                .address(event.getAddress())
                .userProfileId(event.getUserProfile() != null ? event.getUserProfile().getId() : null)
                .calendarId(event.getCalendars() != null ? event.getCalendars().getId() : null)
                .hosts(mapToHostDtoList(event.getHosts())) // Map the list of Hosts to HostDto
                .guestIds(event.getGuests() != null ? event.getGuests().stream().map(Guests::getId).collect(Collectors.toList()) : null)
                .build();

        return eventsDto;
    }

    // Helper method to map List<Hosts> to List<HostDto>
    private static List<HostDto> mapToHostDtoList(List<Hosts> hosts) {
        if (hosts == null) {
            return null;
        }
        return hosts.stream()
                .map(host -> HostDto.builder()
                        .id(host.getId())
                        .name(host.getName())
                        .email(host.getEmail())
                        .role(host.getRole())
                        .eventId(host.getEvent() != null ? host.getEvent().getId() : null) // Set the eventId if present
                        .build())
                .collect(Collectors.toList());
    }
}