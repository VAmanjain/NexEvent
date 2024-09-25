package app.server.NexEvent.auth.service;


import app.server.NexEvent.auth.dto.LoginUserDto;
import app.server.NexEvent.auth.dto.RegisterUserDto;
import app.server.NexEvent.auth.mapper.UserMapper;
import app.server.NexEvent.auth.entities.User;
import app.server.NexEvent.auth.repository.UserRepository;
import app.server.NexEvent.entitites.UserProfile;
import app.server.NexEvent.mapper.RegisterProfileMapper;
import app.server.NexEvent.repository.UserProfileRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserProfileRepository userProfileRepository;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder, UserProfileRepository userProfileRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userProfileRepository = userProfileRepository;
    }

    public RegisterUserDto signup(RegisterUserDto input) {
        var user = UserMapper.mapToUser(input, passwordEncoder.encode(input.getPassword()));
        UserProfile userProfile = RegisterProfileMapper.mapToUserProfile(user);
        userProfileRepository.save(userProfile);
        userRepository.save(user);
        return UserMapper.mapToUser(user, passwordEncoder.encode(user.getPassword()));
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}
