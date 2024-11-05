package app.server.NexEvent.mapper;

import app.server.NexEvent.auth.entities.User;
import app.server.NexEvent.dtos.RegisterProfileDto;
import app.server.NexEvent.entitites.SocailMedia;
import app.server.NexEvent.entitites.UserProfile;

public class RegisterProfileMapper {
    public static UserProfile mapToUserProfile (RegisterProfileDto registerProfileDto){
        UserProfile regUser = UserProfile.builder()
                .user(registerProfileDto.getUser())
                .username(registerProfileDto.getUsername())
                .image(registerProfileDto.getImage())
                .build();

        return regUser;
    }

    public static  RegisterProfileDto mapToRegisterUserDto (UserProfile userProfile){
       RegisterProfileDto regUser = RegisterProfileDto.builder()
               .user(userProfile.getUser())
               .username(userProfile.getUsername())
               .image(userProfile.getImage())
               .build();
       return regUser;
    }

    public  static UserProfile mapToUserProfile (User user){
        return  UserProfile.builder().user(user).username(user.getFullName()).build();
    }

}
