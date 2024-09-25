package app.server.NexEvent.repository;

import app.server.NexEvent.entitites.Calendars;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CalendarsRepository extends JpaRepository<Calendars, Long> {
    List<Calendars> findByUserProfileId(Long id);
}
