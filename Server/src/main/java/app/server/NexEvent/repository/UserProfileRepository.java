package app.server.NexEvent.repository;

import app.server.NexEvent.entitites.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    UserProfile findByUserId(Long id);



    List<UserProfile> findByUsername(String username);
}
