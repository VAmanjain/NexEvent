package app.server.NexEvent.dtos;

import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.entitites.UserProfile;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CalendarDto {
    private Long id;
    private String cal_name;
    private String ownerName;
    private List<Event> events;
    private Long userProfileId;
}
