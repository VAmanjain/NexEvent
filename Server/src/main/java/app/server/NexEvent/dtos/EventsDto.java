package app.server.NexEvent.dtos;

import app.server.NexEvent.entitites.Address;
import app.server.NexEvent.entitites.Hosts;
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
    private Long id;
    private String name;
    private String desc;
    private String image;
    private String hostName;
    private String type;
    private String status;
    private Boolean approval;
    private Long limit;
    private String cal_name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime startingTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime endingTime;
    private String addressLink;
    private Long userProfileId;
    private Long calendarId;
    private List<HostDto> hosts;
    private List<Long> guestIds;
    private Address address; // Include AddressDTO

}
