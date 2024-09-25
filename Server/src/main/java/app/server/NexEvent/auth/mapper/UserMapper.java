package app.server.NexEvent.auth.mapper;

import app.server.NexEvent.auth.dto.RegisterUserDto;
import app.server.NexEvent.auth.entities.User;

public class UserMapper {

//
//    public static LoginUserDto mapToUserDto (User user){
//        LoginUserDto userDto = LoginUserDto.builder()
//                .email(user.getEmail())
//                .password(user.getPassword())
//                .build();
//        return userDto;
//    }
//
    public static User mapToUser (RegisterUserDto registerUserDto, String password){
        User user = User.builder()
                .id(registerUserDto.getId())
                .email(registerUserDto.getEmail())
                .fullName(registerUserDto.getFullName())
                .password(password)
                .build();
        return user;
    }

    public static RegisterUserDto mapToUser (User registerUserDto, String password){
        RegisterUserDto user = RegisterUserDto.builder()
                .id(registerUserDto.getId())
                .email(registerUserDto.getEmail())
                .fullName(registerUserDto.getFullName())
                .password(password)
                .build();
        return user;
    }
}
