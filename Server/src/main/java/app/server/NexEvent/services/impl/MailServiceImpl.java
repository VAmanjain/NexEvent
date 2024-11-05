package app.server.NexEvent.services.impl;

import app.server.NexEvent.services.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class MailServiceImpl implements MailService {
    private Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String to, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        simpleMailMessage.setFrom("nexEvent107@gmail.com");
        mailSender.send(simpleMailMessage);
        logger.info("Mail is send successfully..................");
    }

    @Override
    public void sendEmail(String[] to, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        simpleMailMessage.setFrom("nexEvent17@gmail.com");
        mailSender.send(simpleMailMessage);
        logger.info("Mail is send successfully..................");
    }

    @Override
    public void sendEmailWithHTML(String to, String subject, String htmlContent) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(to);
            helper.setFrom("nexEvent107@gmail.com");
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        mailSender.send(mimeMessage);
        logger.info("Mail is send successfully..................");
    }

    @Override
    public void sendEmailWithFile(String to, String subject, String message, File file) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
            helper.setTo(to);
            helper.setFrom("nexEvent107@gmail.com");
            helper.setText(message);
            helper.setSubject(subject);
            FileSystemResource fileSystemResource = new FileSystemResource(file);
            helper.addAttachment(fileSystemResource.getFilename(),file);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        mailSender.send(mimeMessage);
        logger.info("Mail is send successfully..................");
    }
}
