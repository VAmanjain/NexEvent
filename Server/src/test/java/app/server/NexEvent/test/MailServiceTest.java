package app.server.NexEvent.test;

import app.server.NexEvent.services.MailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;

@SpringBootTest
public class MailServiceTest {

    @Autowired
    private MailService emailService;

    @Test
    void sendEmailTest() {
        System.out.println("Sending email");
        emailService.sendEmail("devashishsoni936@gmail.com",
                "This is Testing Email",
                "This is a testing email while creating a spring boot application with spring boot mail service . ---- SMTP ");
    }

    @Test
    void sendEmailWithHtmlTest(){
        System.out.println("Sendig email.......");
        String html = ""+" <h1 style=\"font-family: Arial, sans-serif; font-size: 2.5em; color: #333; text-align: center; margin-top: 20%; background-color: #f0f0f0;\">\n" +
                "        Hello, this is Aman\n" +
                "    </h1>" +"";
        emailService.sendEmailWithHTML("aj93586o5117@gmail.com",
                "This is Testing Email",
                html
        );
    }
    //    lavinasevani2432004@gmail.com
    @Test
    void sendEmailWithFile(){
        System.out.println("Sendig email.......");
        String file ="C:\\Users\\AMAN\\Pictures\\naruto-shippuuden-uzumaki-naruto-anime-wallpaper-preview.jpg";
        emailService.sendEmailWithFile("devashishsoni936@gmail.com",
                "This is Testing Email ---- File Sending",
                "Hey This is Aman",
                new File(file)
        );
    }
}
