package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.SocialMediaDto;
import app.server.NexEvent.dtos.UpdateUserProfileDto;
import app.server.NexEvent.entitites.UserProfile;

public class UpdatedUserProfileMapper {
    public static void mapToUserProfile(UpdateUserProfileDto updateUserProfileDto, UserProfile userProfile) {
        userProfile.setUsername(updateUserProfileDto.getUsername());
        userProfile.setImage(updateUserProfileDto.getImage());
        userProfile.setBio(updateUserProfileDto.getBio());
        userProfile.setPhoneNo(updateUserProfileDto.getPhoneNo());

        // Assuming SocailMedia is a field in UserProfile and you have a method to set it
        userProfile.setSocailMedia(SocialMediaMapper.toEntity(updateUserProfileDto.getSocialMedia()));
    }
//
//    public static UpdateUserProfileDto toDto(UserProfile userProfile) {
//        return UpdateUserProfileDto.builder()
//                .id(userProfile.getId())
//                .username(userProfile.getUsername())
//                .bio(userProfile.getBio())
//                .image(userProfile.getImage())
//                .phoneNo(userProfile.getPhoneNo())
//                .socialMedia(SocialMediaMapper.toDto(userProfile.getSocailMedia()))  // Corrected typo
//                .build();
//    }
//
//    // Method to map UpdateUserProfileDto to UserProfile
//    public static UserProfile toEntity(UpdateUserProfileDto dto) {
//        return UserProfile.builder()
//                .id(dto.getId())
//                .username(dto.getUsername())
//                .bio(dto.getBio())
//                .image(dto.getImage())
//                .phoneNo(dto.getPhoneNo())
//                .socailMedia(SocialMediaMapper.toEntity(dto.getSocialMedia()))  // Corrected typo
//                .build();
//    }

    public static UpdateUserProfileDto toDto(UserProfile userProfile) {
        // Null check for userProfile
        if (userProfile == null) {
            return null; // or throw an exception based on your design
        }

        // Retrieve social media safely
        String insta = null;
        if (userProfile.getSocailMedia() != null) {
            insta = userProfile.getSocailMedia().getInsta(); // Assuming getInsta() returns a String
        }

        return UpdateUserProfileDto.builder()
                .id(userProfile.getId())
                .username(userProfile.getUsername())
                .bio(userProfile.getBio())
                .image(userProfile.getImage())
                .phoneNo(userProfile.getPhoneNo())
                .socialMedia(SocialMediaDto.builder().insta(insta).build()) // Set Instagram handle or null
                .build();
    }

    // Method to map UpdateUserProfileDto to UserProfile
    public static UserProfile toEntity(UpdateUserProfileDto dto) {
        if (dto == null) {
            return null; // or throw an exception based on your design
        }

        return UserProfile.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .bio(dto.getBio())
                .image(dto.getImage())
                .phoneNo(dto.getPhoneNo())
                .socailMedia(SocialMediaMapper.toEntity(dto.getSocialMedia()))  // Assuming a SocialMediaMapper exists
                .build();
    }


}

