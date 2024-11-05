package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.SocialMediaDto;
import app.server.NexEvent.entitites.SocailMedia;

public class SocialMediaMapper {
    public static SocialMediaDto toDto(SocailMedia socailMedia) {
        return SocialMediaDto.builder()
                .insta(socailMedia.getInsta())
                .twitter(socailMedia.getTwitter())
                .linkedIn(socailMedia.getLinkedIn())
                .build();
    }

    public static SocailMedia toEntity(SocialMediaDto socialMediaDto) {
        return SocailMedia.builder()
                .insta(socialMediaDto.getInsta())
                .twitter(socialMediaDto.getTwitter())
                .linkedIn(socialMediaDto.getLinkedIn())
                .build();
    }
}