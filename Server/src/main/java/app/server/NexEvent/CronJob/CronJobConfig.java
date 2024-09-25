////package app.server.NexEvent.CronJob;
////
////import app.server.NexEvent.entitites.Event;
////import app.server.NexEvent.entitites.Guests;
////import app.server.NexEvent.repository.EventRepository;
////import app.server.NexEvent.services.EventService;
////import app.server.NexEvent.services.MailService;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.scheduling.annotation.Scheduled;
////import org.springframework.stereotype.Component;
////import org.springframework.stereotype.Service;
////
////import java.time.LocalDateTime;
////import java.util.List;
////
////@Component
////public class CronJobConfig {
////
//////    @Autowired
//////    private EventRepository eventRepository;
//////    @Autowired
//////    private MailService mailService;
//////    @Autowired
//////    private EventService eventService;
//////
//////
//////    LocalDateTime now = LocalDateTime.now();
//////    List<Event> eventToStart = eventRepository.findByStartingTime(now);
//////    @Scheduled(cron = "0 */1 * * * *")
//////    public void processsMail(){
//////
////////        {
////////            mailService.sendEmail("2022pietcraman002@poornima.org", "This is reminder", "This event is started at: " + now);
////////            System.out.println("Email is send");
////////        }
////////        System.out.println(eventToStart);
//////
//////        System.out.println(now);
//////
////////        for (Event events: eventToStart){
////////            Guests guests =
////////            mailService.sendEmail(, "This is reminder", "This event is started at: "+now);
////////            System.out.println("--------------Event is stated-----------------");
////////            mailTimer.setStatus("Live");
////////            mailRepository.save(mailTimer);
////////        }
//////
////////        for (MailTimer mailTimer: allEvents){
////////            emailService.sendEmail(mailTimer.getMail(), "This is reminder", "This event is started at: "+now);
////////            System.out.println("--------------Event is stated-----------------");
////////            mailTimer.setStatus("Live");
////////            mailRepository.save(mailTimer);
////////        }
////////
////////        for (MailTimer mailTimer: eventToEnd){
////////            emailService.sendEmail(mailTimer.getMail(), "This is reminder", "This event is ended at: "+now);
////////            System.out.println("--------------Event is Ended-----------------");
////////            mailTimer.setStatus("Closed");
////////            mailRepository.save(mailTimer);
////////        }
//////    }
////}
//
//
//package app.server.NexEvent.CronJob;
//
//import app.server.NexEvent.entitites.Event;
//import app.server.NexEvent.entitites.Guests;
//import app.server.NexEvent.repository.EventRepository;
//import app.server.NexEvent.services.EventService;
//import app.server.NexEvent.services.MailService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.LocalTime;
//import java.util.List;
//
//@Component
//public class CronJobConfig {
//
//    @Autowired
//    private EventRepository eventRepository;
//
//    @Autowired
//    private MailService mailService;
//
//    @Autowired
//    private EventService eventService;
//
//    /**
//     * Cron job scheduled to run every minute to check for events that are starting
//     * and send reminder emails to guests.
//     */
//    @Scheduled(cron = "0 */1 * * * *")
//    public void processMail() {
////        LocalDateTime now = LocalDateTime.now();
//
//        LocalDateTime now = LocalDateTime.of(
//                LocalDate.now(),
//                LocalTime
//                        .of(LocalTime.now().getHour(), LocalTime.now().getMinute())
//        );
//
//        // Find events that are starting at the current time
//        List<Event> eventsToStart = eventRepository.findByStartingTime(now);
//
//        if (eventsToStart.isEmpty()) {
//            System.out.println("No events starting at this time: " + now);
//        } else {
//            for (Event event : eventsToStart) {
//                // Fetch all guests associated with the event
//                List<Guests> guests = event.getGuests();
//
//                for (Guests guest : guests) {
//                    String email = guest.getEmails();
//                    String subject = "Event Reminder: " + event.getName();
//                    String message = "Dear " + guest.getName() + ",\n\n"
//                            + "This is a reminder that the event '" + event.getName()
//                            + "' is starting at " + event.getStartingTime() + ".\n"
//                            + "Location: " + event.getAddressLink() + "\n\n"
//                            + "Best regards,\nNexEvent Team";
//
//                    // Send email to each guest
//                    mailService.sendEmail(email, subject, message);
//                    System.out.println("Reminder email sent to: " + email);
//                }
//            }
//        }
//    }
//}

package app.server.NexEvent.CronJob;

import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.entitites.Guests;
import app.server.NexEvent.repository.EventRepository;
import app.server.NexEvent.repository.GuestRepository;
import app.server.NexEvent.services.MailService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
public class CronJobConfig {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private MailService mailService;


    @Transactional
    @Scheduled(cron = "0 */1 * * * *")
    public void processMail() {
        LocalDateTime now = LocalDateTime.of(LocalDate.now(),
                LocalTime.of(LocalTime.now().getHour(), LocalTime.now().getMinute()));

        // Find events that are starting at the current time
        List<Event> eventsToStart = eventRepository.findByStartingTime(now);

        if (eventsToStart.isEmpty()) {
            System.out.println("No events starting at this time: " + now);
        } else {
            for (Event event : eventsToStart) {
                // Initialize the guests collection
//                Hibernate.initialize(event.getGuests());
                System.out.println("Event "+event.getName()+" is  starting at this time: " + now);

                event.setStatus("Live");
                eventRepository.save(event);

                List<Guests> guests = guestRepository.findByEventId(event.getId());

                for (Guests guest : guests) {
                    System.out.println("Guest id:"+ guest.getEmails());
                }

                if (!guests.isEmpty()){
                    System.out.println("--------------------------------------------- Guest is exist. ------------------------------------");
                }

//                List<Guests> guests = event.getGuests();
                for (Guests guest : guests) {
                    System.out.println("Reminder email sent to: " + guest.getEmails());
                    String email = guest.getEmails();
                    String subject = "Event Reminder: " + event.getName();
                    String message = "<!DOCTYPE html>" +
                            "<html lang='en'>" +
                            "<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Event Reminder</title></head>" +
                            "<body>" +
                            "<div style='font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color:#f9f9f9;'>" +
                            "<h1 style='color:#007BFF;'>Event Reminder</h1>" +
                            "<h2>Dear " + guest.getName() + ",</h2>" +
                            "<p>This is a reminder that the event '<strong>" + event.getName() + "</strong>' is starting at <strong>" + event.getStartingTime() + "</strong>.</p>" +
                            "<p>Location: <a href='" + event.getAddressLink() + "'>" + event.getAddressLink() + "</a></p>" +
                            "<p>We look forward to seeing you there!</p>" +
                            "<p>Best regards,<br>NexEvent Team</p>" +
                            "</div></body></html>";

                    // Send email to each guest
                    mailService.sendEmailWithHTML(email, subject, message);
                    System.out.println("Reminder email sent to: " + email);
                }
            }
        }
    }
}