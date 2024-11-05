//package app.server.NexEvent.repository;
//
//import app.server.NexEvent.entitites.Event;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Repository
//public interface EventRepository extends JpaRepository<Event, Long> {
//    List<Event> findByStartingTime(LocalDateTime now);
//}

package app.server.NexEvent.repository;

import app.server.NexEvent.entitites.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByStartingTime(LocalDateTime now);

    List<Event> findByUserProfileId(Long userId);

    List<Event> findByIsPrivateFalseAndStartingTimeAfterOrEndingTimeGreaterThan(LocalDateTime startingTime, LocalDateTime endingTime);

    List<Event> findAllByStartingTimeAfter(LocalDateTime now);

    List<Event> findAllByEndingTimeBefore(LocalDateTime now);
}
