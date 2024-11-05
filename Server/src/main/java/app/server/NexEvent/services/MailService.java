package app.server.NexEvent.services;

import java.io.File;


public interface MailService {
    //Email for single person
    void sendEmail(String to, String subject, String message);

    //Email for multiple person
    void sendEmail(String to[], String subject, String message);

    //Email for HTML Content
    void sendEmailWithHTML(String to, String subject, String htmlContent);

    //    Email With File
    void sendEmailWithFile(String to, String subject, String message, File file);
}
