package app.server.NexEvent.test;

import app.server.NexEvent.dtos.EventsDto;

import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.mapper.EventMapper;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

public class EventMapperTest {

    @Test
    public void testMapToEvent() {
        EventsDto dto = EventsDto.builder()
                .id(1L)
                .name("Sample Event")
                .description("This is a sample event.")
                .startingTime(LocalDateTime.now().plusDays(1))
                .endingTime(LocalDateTime.now().plusDays(2))
                .isPrivate(false)
                .build();

        Event event = EventMapper.mapToEvent(dto);

        assertNotNull(event);
        assertEquals(dto.getId(), event.getId());
        assertEquals(dto.getName(), event.getName());
        assertEquals(dto.getDescription(), event.getDescription());
        assertFalse(event.isPrivate());
    }

    @Test
    public void testMapToEventsDto() {
        Event event = Event.builder()
                .id(1L)
                .name("Sample Event")
                .description("This is a sample event.")
                .startingTime(LocalDateTime.now().plusDays(1))
                .endingTime(LocalDateTime.now().plusDays(2))
                .isPrivate(false)
                .build();

        EventsDto dto = EventMapper.mapToEventsDto(event);

        assertNotNull(dto);
        assertEquals(event.getId(), dto.getId());
        assertEquals(event.getName(), dto.getName());
        assertEquals(event.getDescription(), dto.getDescription());
    }
}