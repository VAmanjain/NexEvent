package app.server.NexEvent.services.impl;

import app.server.NexEvent.dtos.GuestDto;
import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.entitites.Guests;
import app.server.NexEvent.mapper.GuestMapper;
import app.server.NexEvent.repository.EventRepository;
import app.server.NexEvent.repository.GuestRepository;
import app.server.NexEvent.services.GuestService;
import app.server.NexEvent.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GuestServiceImpl implements GuestService {
    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    MailService mailService;

    @Autowired
    private GuestMapper guestMapper;

    public List<GuestDto> getAllGuests() {
        return guestRepository.findAll().stream()
                .map(guestMapper::toGuestDTO)
                .collect(Collectors.toList());
    }

    public GuestDto getGuestById(Long id) {
        Guests guest = guestRepository.findById(id).orElseThrow(() -> new RuntimeException("Guest not found"));
        return guestMapper.toGuestDTO(guest);
    }

    public List<GuestDto> getGuestsByEventId(Long eventId) {
        List<Guests> guests = guestRepository.findByEventId(eventId);
        return guests.stream()
                .map(guestMapper::toGuestDTO)
                .collect(Collectors.toList());
    }

//    public GuestDto createGuest(GuestDto guestDto) {
//        Event event = eventRepository.getReferenceById(guestDto.getEventId());
//        System.out.println("---------------------------------------"+event.getName()+"--------------------------");
//        guestDto.setGuestCode("G-"+guestDto.getGuestId()+guestDto.getEventId());
//        System.out.println("Guest Code: "+guestDto.getGuestCode());
//        Guests guest = guestMapper.toEntity(guestDto);
//        String message = "<!DOCTYPE html>" +
//                "<html lang='en'>" +
//                "<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Event Reminder</title></head>" +
//                "<body>" +
//                "<div style='font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color:#f9f9f9;'>" +
//                "<h1>Thank you for registering for "+event.getName()+"</h1>" +
//                "<h2>Dear " + guest.getName() + ",</h2>" +
//                "<p>We are pleased to confirm your registration for the"+event.getName()+". We look forward to seeing you there!</p>"+
//                "<p>Location: <a href='" + event.getAddressLink() + "'>" + event.getAddressLink() + "</a></p>" +
//                "<p>We look forward to seeing you there!</p>" +
//                "<p>Best regards,<br>NexEvent Team</p>" +
//                "</div></body></html>";
//
//        mailService.sendEmail(guestDto.getEmails(), " NexEvent Registeration Event confirmation", "");
//        Guests savedGuest = guestRepository.save(guest);
//        return guestMapper.toDto(savedGuest);
//    }

    public GuestDto createGuest(GuestDto guestDto) {
        Event event = eventRepository.getReferenceById(guestDto.getEventId());
        System.out.println("---------------------------------------" + event.getName() + "--------------------------");
        guestDto.setGuestCode("G-" + guestDto.getGuestId() + guestDto.getEventId());
        System.out.println("Guest Code: " + guestDto.getGuestCode());
        Guests guest = guestMapper.toEntity(guestDto);

        String message = "<!DOCTYPE html>"
                + "<html lang='en'>"
                + "<head>"
                + "<meta charset='UTF-8'>"
                + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "<title>Event Reminder</title>"
                + "<style>"
                + "body {"
                + "font-family: Arial, sans-serif;"
                + "margin: 0;"
                + "padding: 20px;"
                + "background-color: #f9f9f9;"
                + "}"
                + "h1, h2 {"
                + "color: #333;"
                + "}"
                + "p {"
                + "line-height: 1.5;"
                + "color: #555;"
                + "}"
                + "a {"
                + "color: #007bff;"
                + "text-decoration: none;"
                + "}"
                + "a:hover {"
                + "text-decoration: underline;"
                + "}"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div>"
                + "<h1>Thank you for registering for " + event.getName() + "</h1>"
                + "<h2>Dear " + guest.getName() + ",</h2>"
                + "<p>We are pleased to confirm your registration for the " + event.getName() + ". We look forward to seeing you there!</p>"
                + "<p>Location: <a href='" + event.getAddressLink() + "' target='_blank'>" + event.getAddressLink() + "</a></p>"
                + "<p>We look forward to seeing you there!</p>"
                + "<p>Best regards,<br>NexEvent Team</p>"
                + "</div>"
                + "</body>"
                + "</html>";
        System.out.println("(----------------------------Email:"+ guestDto.getEmails()+"-------------------------)");
        mailService.sendEmailWithHTML(guestDto.getEmails(), "NexEvent Registration Event Confirmation", message);
        Guests savedGuest = guestRepository.save(guest);
        return guestMapper.toGuestDTO(savedGuest);
    }
    public GuestDto updateGuest(Long id, GuestDto guestDto) {
        Guests existingGuest = guestRepository.findById(id).orElseThrow(() -> new RuntimeException("Guest not found"));
        existingGuest.setName(guestDto.getName());
        existingGuest.setGuestId(guestDto.getGuestId());
        existingGuest.setGuestCode(guestDto.getGuestCode());
        existingGuest.setEntryId(guestDto.getEntryId());
        Guests updatedGuest = guestRepository.save(existingGuest);
        return guestMapper.toGuestDTO(updatedGuest);
    }

    public void deleteGuest(Long id) {
        guestRepository.deleteById(id);
    }
}
