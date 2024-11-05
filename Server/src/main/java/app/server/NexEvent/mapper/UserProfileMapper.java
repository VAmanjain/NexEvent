package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.UserProfileDto;
import app.server.NexEvent.entitites.UserProfile;

public class UserProfileMapper {

   static public UserProfileDto toDto(UserProfile userProfile) {
        if (userProfile == null) {
            return null; // Handle null case
        }

        return UserProfileDto.builder()
                .id(userProfile.getId())
                .username(userProfile.getUsername())
                .build();
    }

   static public UserProfile toEntity(UserProfileDto userProfileDto) {
        if (userProfileDto == null) {
            return null; // Handle null case
        }

        return UserProfile.builder()
                .id(userProfileDto.getId())
                .username(userProfileDto.getUsername())
                // You may want to set other fields to null or default if not present in DTO
                .build();
    }
}