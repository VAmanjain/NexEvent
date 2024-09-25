package app.server.NexEvent.test;

import app.server.NexEvent.auth.entities.User;
import app.server.NexEvent.auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
public class TestAPI {
    public  UserRepository userRepository;

    @Test
     void test (){
//        List<User> users = new ArrayList<>();

//        userRepository.findAll().forEach(users::add);
    Optional<User> user = Optional.of(new User());
    user=userRepository.findByEmail("aman11@gamil.com");
        System.out.println(user);

    }

}
