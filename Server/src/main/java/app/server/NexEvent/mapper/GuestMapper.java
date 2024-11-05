package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.GuestDto;

import app.server.NexEvent.entitites.*;
import org.springframework.stereotype.Component;

@Component
public class GuestMapper {

    // Convert Guests entity to GuestDto
    public GuestDto toGuestDTO(Guests guest) {
        if (guest == null) {
            return null; // Handle null case
        }

        return GuestDto.builder()
                .id(guest.getId())
                .name(guest.getName())
                .guestId(guest.getGuestId()) // Assuming guest ID corresponds to UserProfile ID
                .guestCode(guest.getGuestCode())
                .entryId(guest.getEntryId())
                .emails(guest.getEmails())
                .status(guest.getStatus())
                .eventId(guest.getEvent() != null ? guest.getEvent().getId() : null) // Get event ID if available
                .build();
    }

    // Convert GuestDto to Guests entity
    public Guests toEntity(GuestDto guestDTO) {
        if (guestDTO == null) {
            return null; // Handle null case
        }

        return Guests.builder()
                .id(guestDTO.getId())
                .name(guestDTO.getName())
                .guestId(guestDTO.getGuestId()) // Assuming guest ID corresponds to UserProfile ID
                .guestCode(guestDTO.getGuestCode())
                .entryId(guestDTO.getEntryId())
                .emails(guestDTO.getEmails())
                .status(guestDTO.getStatus())
                .event(Event.builder().id(guestDTO.getEventId()).build()) // Set event if available
                .build();
    }
}