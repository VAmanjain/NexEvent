package app.server.NexEvent.dtos;

import app.server.NexEvent.entitites.Event;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HostDto {
    private Long id;
    private String name;
    private String email;
    private String role;
    private Long eventId;
}
