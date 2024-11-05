package app.server.NexEvent.services;

import app.server.NexEvent.entitites.Mail;
import org.springframework.stereotype.Service;

import java.util.List;


public interface MailsService {
    public Mail save(Mail mail);

    public List<Mail> findAll();

    public Mail findById(Long id);

    public void deleteById(Long id);

    public boolean existsById(Long id);

    public void sentWithText(Mail mail);

    public void sendInvitaion(Mail mail, Long eventId);
}

