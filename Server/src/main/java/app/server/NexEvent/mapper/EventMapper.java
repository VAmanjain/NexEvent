package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.EventsDto;
import app.server.NexEvent.dtos.HostDto;
import app.server.NexEvent.dtos.AddressDto; // Import AddressDto
import app.server.NexEvent.entitites.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EventMapper {

    public static Event mapToEvent(EventsDto eventsDto) {
        if (eventsDto == null) {
            throw new IllegalArgumentException("EventsDto cannot be null");
        }

        return Event.builder()
                .id(eventsDto.getId())
                .name(eventsDto.getName())
                .description(eventsDto.getDescription())
                .image(eventsDto.getImage())
                .addressLink(eventsDto.getAddressLink())
                .hostName(eventsDto.getHostName())
                .calendarName(eventsDto.getCalendarName())
                .startingTime(eventsDto.getStartingTime())
                .endingTime(eventsDto.getEndingTime())
                .approval(eventsDto.getApproval())
                .limit(eventsDto.getLimit())
                .status(eventsDto.getStatus())
                .address(mapToAddress(eventsDto.getAddress())) // Correct mapping from AddressDto to Address
                .userProfile(eventsDto.getUserProfileId() != null ? UserProfile.builder().id(eventsDto.getUserProfileId()).build() : null)
                .calendars(eventsDto.getCalendarId() != null ? Calendars.builder().id(eventsDto.getCalendarId()).build() : null)
                .hosts(mapToHostsList(eventsDto.getHosts()))
                .guests(mapToGuestsList(eventsDto.getGuestIds()))
                .invitedEmails(eventsDto.getInvitedEmails())
                .build();
    }

    public static EventsDto mapToEventsDto(Event event) {
        if (event == null) {
            return null;
        }

        return EventsDto.builder()
                .id(event.getId())
                .name(event.getName())
                .image(event.getImage())
                .description(event.getDescription())
                .addressLink(event.getAddressLink())
                .hostName(event.getHostName())
                .calendarName(event.getCalendarName())
                .startingTime(event.getStartingTime())
                .endingTime(event.getEndingTime())
                .approval(event.getApproval())
                .limit(event.getLimit())
                .status(event.getStatus())
                .address(mapToAddressDto(event.getAddress())) // Map Address to DTO
                .userProfileId(event.getUserProfile() != null ? event.getUserProfile().getId() : null)
                .calendarId(event.getCalendars() != null ? event.getCalendars().getId() : null)
                .hosts(mapToHostDtoList(event.getHosts()))
                .guestIds(event.getGuests() != null ? event.getGuests().stream().map(Guests::getId).collect(Collectors.toList()) : null)
                .invitedEmails(event.getInvitedEmails())
                .build();
    }

    private static List<Hosts> mapToHostsList(List<HostDto> hostDtos) {
        if (hostDtos == null) {
            return null;
        }
        return hostDtos.stream()
                .map(HostsMapper::mapToHost) // Use HostMapper for mapping
                .collect(Collectors.toList());
    }

    private static List<Guests> mapToGuestsList(List<Long> guestIds) {
        if (guestIds == null) {
            return null;
        }
        return guestIds.stream()
                .map(id -> Guests.builder().id(id).build()) // Assuming only ID is needed for now
                .collect(Collectors.toList());
    }

    private static Address mapToAddress(AddressDto addressDto) { // Correctly accepts AddressDto
        if (addressDto == null) {
            return null; // Handle the case where address is not provided
        }
        return Address.builder()
                .id(addressDto.getId()) // Use address DTO fields
                .houseNo(addressDto.getHouseNo())
                .street(addressDto.getStreet())
                .city(addressDto.getCity())
                .state(addressDto.getState())
                .country(addressDto.getCountry())
                .build();
    }

    private static AddressDto mapToAddressDto(Address address) { // Correctly accepts Address
        if (address == null) {
            return null; // Handle the case where address is not provided
        }
        return AddressDto.builder()
                .id(address.getId())
                .houseNo(address.getHouseNo())
                .street(address.getStreet())
                .city(address.getCity())
                .state(address.getState())
                .country(address.getCountry())
                .build();
    }

    private static List<HostDto> mapToHostDtoList(List<Hosts> hosts) {
        if (hosts == null) {
            return null;
        }
        return hosts.stream()
                .map(HostsMapper::toHostDTO) // Use HostMapper for mapping to DTO
                .collect(Collectors.toList());
    }
}