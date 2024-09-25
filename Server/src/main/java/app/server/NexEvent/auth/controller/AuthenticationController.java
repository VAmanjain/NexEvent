package app.server.NexEvent.auth.controller;

import app.server.NexEvent.auth.dto.LoginUserDto;

import app.server.NexEvent.auth.dto.RegisterUserDto;
import app.server.NexEvent.auth.entities.User;
import app.server.NexEvent.auth.responses.LoginResponse;
import app.server.NexEvent.auth.service.AuthenticationService;
import app.server.NexEvent.auth.service.JwtService;
import app.server.NexEvent.entitites.UserProfile;
import app.server.NexEvent.mapper.RegisterProfileMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserDto> register(@RequestBody RegisterUserDto registerUserDto){
        RegisterUserDto registeredUser = authenticationService.signup(registerUserDto);
//        UserProfile userProfile = RegisterProfileMapper.mapToUserProfile()
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDto loginUserDto){

    User authenticatedUser = authenticationService.authenticate(loginUserDto);
    String jwtToken=jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse );

    }



}
