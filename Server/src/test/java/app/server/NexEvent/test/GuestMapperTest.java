package app.server.NexEvent.test;

import app.server.NexEvent.dtos.GuestDto;
import app.server.NexEvent.entitites.Guests;
import app.server.NexEvent.mapper.GuestMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class GuestMapperTest {

    @Test
    public void testToGuestDTO() {
        Guests guest = Guests.builder()
                .id(1L)
                .name("Jane Smith")
                .guestId(100L)
                .guestCode("GUEST123")
                .entryId("ENTRY456")
                .emails("jane@example.com")
                .status("Confirmed")
                .build();

        GuestDto dto = new GuestMapper().toGuestDTO(guest);

        assertNotNull(dto);
        assertEquals(guest.getId(), dto.getId());
        assertEquals(guest.getName(), dto.getName());
        assertEquals(guest.getGuestId(), dto.getGuestId());
    }

    @Test
    public void testToEntity() {
        GuestDto guestDTO = GuestDto.builder()
                .id(1L)
                .name("Jane Smith")
                .guestId(100L)
                .guestCode("GUEST123")
                .entryId("ENTRY456")
                .emails("jane@example.com")
                .status("Confirmed")
                //.event(Event.builder().id(guestDTO.eventId()).build())
                // Uncomment if you want to set event directly from DTO.
                // Set Event entity if needed (you may need to fetch it from the database)
                // Uncomment above line if you want to set event directly from DTO.
                .build();

        Guests guest = new GuestMapper().toEntity(guestDTO);

        assertNotNull(guest);
        assertEquals(guestDTO.getId(), guest.getId());
        assertEquals(guestDTO.getName(), guest.getName());
    }
}