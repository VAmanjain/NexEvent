package app.server.NexEvent.repository;

import app.server.NexEvent.entitites.Hosts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostsRepository extends JpaRepository<Hosts, Long> {
}
