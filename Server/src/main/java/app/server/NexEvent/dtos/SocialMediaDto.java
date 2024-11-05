package app.server.NexEvent.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SocialMediaDto {
    private String insta;
    private String twitter;
    private String linkedIn;
}