package app.server.NexEvent.repository;

import app.server.NexEvent.entitites.Guests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<Guests, Long> {
    List<Guests> findByEventId(Long eventId);

}
