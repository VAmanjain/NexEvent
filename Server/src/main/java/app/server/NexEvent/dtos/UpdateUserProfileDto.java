package app.server.NexEvent.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateUserProfileDto {
    private Long id;
    private String username;
    private String image;
    private String bio;
    private Long phoneNo;
    private SocialMediaDto socialMedia;
}
