package app.server.NexEvent.auth.controller;

import app.server.NexEvent.auth.entities.User;
import app.server.NexEvent.auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        System.out.println(currentUser);
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }
}
