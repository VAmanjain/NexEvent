package app.server.NexEvent.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GuestDto {
    private Long id;
    private String name;
    private Long guestId; // same as UserProfile id
    private String guestCode;
    private Long eventId; // Foreign key to Event
    private String entryId;
    private String emails;
    private String status;
}