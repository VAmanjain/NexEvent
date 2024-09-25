package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.GuestDto;
import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.entitites.Guests;
import org.springframework.stereotype.Component;

@Component
public class GuestMapper {

    public GuestDto toDto(Guests guest) {
        return GuestDto.builder()
                .id(guest.getId())
                .name(guest.getName())
                .guestId(guest.getGuestId())
                .guestCode(guest.getGuestCode())
                .status(guest.getStatus())
                .emails(guest.getEmails())
                .eventId(guest.getEvent() != null ? guest.getEvent().getId() : null)
                .entryId(guest.getEntryId())
                .build();
    }

    public Guests toEntity(GuestDto guestDto) {
        Guests guest =  Guests.builder()
                .id(guestDto.getGuestId())
                .name(guestDto.getName())
                .guestId(guestDto.getGuestId())
                .entryId(guestDto.getEntryId())
                .guestCode(guestDto.getGuestCode())
                .status(guestDto.getStatus())
                .emails(guestDto.getEmails())
                .event(Event.builder().id(guestDto.getEventId()).build())
                .build();

//        guest.setId(guestDto.getId());
//        guest.setName(guestDto.getName());
//        guest.setGuestId(guestDto.getGuestId());
//        guest.setGuestCode(guestDto.getGuestCode());
//        guest.setEntry_id(guestDto.getEntryId());
        // Set Event entity if needed (you may need to fetch it from the database)
        return guest;
    }
}