package app.server.NexEvent.dtos;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserProfileDto {
    private Long id;
    private String username;
}
