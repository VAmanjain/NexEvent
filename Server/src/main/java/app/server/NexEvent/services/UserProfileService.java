package app.server.NexEvent.services;

import app.server.NexEvent.dtos.RegisterProfileDto;
import app.server.NexEvent.dtos.UpdateUserProfileDto;
import app.server.NexEvent.dtos.UserProfileDto;
import app.server.NexEvent.entitites.UserProfile;

public interface UserProfileService {
    public  UserProfile createUserProfile (RegisterProfileDto regUser);

    public UpdateUserProfileDto getUserProfile(Long userId);

    public UserProfile updateUserProfile(Long userId, UpdateUserProfileDto updateUserProfile);
}
