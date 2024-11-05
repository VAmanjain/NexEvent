package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.HostDto;

import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.entitites.Hosts;
import org.springframework.stereotype.Component;

@Component
public class HostsMapper {

    // Convert HostDto to Hosts entity
    public static Hosts mapToHost(HostDto hostDto) {
        if (hostDto == null) {
            return null; // Handle null case
        }

        return Hosts.builder()
                .id(hostDto.getId())
                .name(hostDto.getName())
                .email(hostDto.getEmail())
                .role(hostDto.getRole())
                .event(hostDto.getEventId() != null ? Event.builder().id(hostDto.getEventId()).build() : null) // Set event if available
                .build();
    }

    // Convert Hosts entity to HostDto
    public static HostDto toHostDTO(Hosts host) {
        if (host == null) {
            return null; // Handle null case
        }

        return HostDto.builder()
                .id(host.getId())
                .name(host.getName())
                .email(host.getEmail())
                .role(host.getRole())
                .eventId(host.getEvent() != null ? host.getEvent().getId() : null) // Get event ID if available
                .build();
    }
}