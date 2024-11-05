package app.server.NexEvent.dtos;

import app.server.NexEvent.auth.entities.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegisterProfileDto {
    private Long id;
    private User user;
    private String username;
    private String image;
}
