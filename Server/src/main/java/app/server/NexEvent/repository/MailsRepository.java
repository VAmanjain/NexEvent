package app.server.NexEvent.repository;

import app.server.NexEvent.entitites.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MailsRepository extends JpaRepository<Mail, Long> {
}
