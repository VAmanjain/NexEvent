package app.server.NexEvent.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class EventsDto {
    private Long id; // Unique identifier for the event

    private String name; // Name of the event

    private String description; // Description of the event

    private String image; // URL of the event image

    private String addressLink; // Link to the address details

    private String hostName; // Name of the host for the event

    private String calendarName; // Name of the calendar associated with the event

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startingTime; // Start time of the event

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endingTime; // End time of the event

    private Boolean approval; // Approval status of the event

    private Long limit; // Maximum number of attendees allowed

    private String status; // Current status of the event (e.g., Upcoming, Ongoing, Completed)

    private Boolean isPrivate; // Indicates if the event is private or public

    private Long userProfileId; // ID of the user profile associated with the event

    private Long calendarId; // ID of the calendar associated with this event

    private List<HostDto> hosts; // List of hosts associated with this event

    private List<Long> guestIds; // List of guest IDs associated with this event

    private  AddressDto address;

    private List<String>invitedEmails;
}