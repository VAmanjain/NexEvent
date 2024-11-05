package app.server.NexEvent.test;

import app.server.NexEvent.dtos.HostDto;
import app.server.NexEvent.entitites.Hosts;
import app.server.NexEvent.mapper.HostsMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class HostMapperTest {

    @Test
    public void testMapToHost() {
        HostDto dto = HostDto.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .role("Organizer")
                .eventId(10L)
                .build();

        Hosts host = HostsMapper.mapToHost(dto);

        assertNotNull(host);
        assertEquals(dto.getId(), host.getId());
        assertEquals(dto.getName(), host.getName());
        assertEquals(dto.getEmail(), host.getEmail());
        assertEquals(dto.getRole(), host.getRole());
    }

    @Test
    public void testToHostDTO() {
        Hosts host = Hosts.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .role("Organizer")
                .build();

        HostDto dto = HostsMapper.toHostDTO(host);

        assertNotNull(dto);
        assertEquals(host.getId(), dto.getId());
        assertEquals(host.getName(), dto.getName());
        assertEquals(host.getEmail(), dto.getEmail());
    }
}