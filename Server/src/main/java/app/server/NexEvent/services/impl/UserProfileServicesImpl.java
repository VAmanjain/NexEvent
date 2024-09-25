package app.server.NexEvent.services.impl;

import app.server.NexEvent.dtos.RegisterProfileDto;
import app.server.NexEvent.dtos.UpdateUserProfileDto;
import app.server.NexEvent.dtos.UserProfileDto;
import app.server.NexEvent.entitites.UserProfile;
import app.server.NexEvent.mapper.RegisterProfileMapper;
import app.server.NexEvent.mapper.UpdatedUserProfileMapper;
import app.server.NexEvent.mapper.UserProfileMapper;
import app.server.NexEvent.repository.UserProfileRepository;
import app.server.NexEvent.services.UserProfileService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserProfileServicesImpl implements UserProfileService {

    @Autowired
    UserProfileRepository userProfileRepository;




    @Override
    public UserProfile createUserProfile(RegisterProfileDto regUser) {

        UserProfile user = RegisterProfileMapper.mapToUserProfile(regUser);
        userProfileRepository.save(user);
        return user;
    }

    @Override
    public UpdateUserProfileDto getUserProfile(Long userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        UpdateUserProfileDto userProfileDto = UpdatedUserProfileMapper.toDto(userProfile);
        return userProfileDto;
    }

    @Override
    public UserProfile updateUserProfile(Long userId, UpdateUserProfileDto updateUserProfile) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        UpdatedUserProfileMapper.mapToUserProfile(updateUserProfile, userProfile);
        userProfileRepository.save(userProfile);
        return userProfile;
    }
}
