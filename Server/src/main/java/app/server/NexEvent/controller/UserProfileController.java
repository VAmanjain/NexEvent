package app.server.NexEvent.controller;

import app.server.NexEvent.dtos.RegisterProfileDto;
import app.server.NexEvent.dtos.UpdateUserProfileDto;
import app.server.NexEvent.dtos.UserProfileDto;
import app.server.NexEvent.entitites.UserProfile;
import app.server.NexEvent.mapper.UpdatedUserProfileMapper;
import app.server.NexEvent.mapper.UserProfileMapper;
import app.server.NexEvent.services.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/profile")
@RestController
public class UserProfileController {

    @Autowired
    UserProfileService userProfileService;

    @PostMapping
    public ResponseEntity<UserProfile> saveUserProfile ( @RequestBody RegisterProfileDto regUser){
//        UserProfile user = RegisterProfileMapper.mapToUserProfile(regUser);
        UserProfile userProfile = userProfileService.createUserProfile(regUser);
        return new ResponseEntity<>(userProfile, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<UpdateUserProfileDto> getUserProfile(@PathVariable("id") Long userId){
        UpdateUserProfileDto userProfile = userProfileService.getUserProfile(userId);
        return ResponseEntity.ok(userProfile);
    }

    @PostMapping("{id}")
    public ResponseEntity<UpdateUserProfileDto> updateUserProfile(@PathVariable("id")  Long userId, @RequestBody UpdateUserProfileDto profileDto){
        UserProfile userProfile = userProfileService.updateUserProfile(userId, profileDto);
        UpdateUserProfileDto userProfileDto = UpdatedUserProfileMapper.toDto(userProfile);
        return ResponseEntity.ok(userProfileDto);
    }
}
