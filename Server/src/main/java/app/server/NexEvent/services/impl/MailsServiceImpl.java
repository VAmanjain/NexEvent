package app.server.NexEvent.services.impl;

import app.server.NexEvent.entitites.Mail;
import app.server.NexEvent.repository.MailsRepository;
import app.server.NexEvent.services.MailService;
import app.server.NexEvent.services.MailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MailsServiceImpl implements MailsService {

    @Autowired
    MailService mailService;

    @Autowired
    private MailsRepository mailRepository;

    public Mail save(Mail mail) {
        return mailRepository.save(mail);
    }

    public List<Mail> findAll() {
        return mailRepository.findAll();
    }

    public Mail findById(Long id) {
        return mailRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        mailRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return mailRepository.existsById(id);
    }

    @Override
    public void sentWithText(Mail mail) {
        List<String> recipients = mail.getTo();

        // Iterate over the recipients list
        for (String recipient : recipients) {
            mailService.sendEmailWithHTML(recipient, mail.getSubject(), mail.getMessage());
        }

    }
}
