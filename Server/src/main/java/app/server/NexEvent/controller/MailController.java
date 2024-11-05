package app.server.NexEvent.controller;


import app.server.NexEvent.dtos.MailDto;
import app.server.NexEvent.entitites.Mail;
import app.server.NexEvent.mapper.MailMapper; // Assume you have a service layer
import app.server.NexEvent.services.MailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private MailsService mailService; // Service to handle business logic

    // Create a new Mail
    @PostMapping
    public ResponseEntity<MailDto> createMail(@RequestBody MailDto mailDTO) {
        Mail mail = MailMapper.toEntity(mailDTO);
        Mail savedMail = mailService.save(mail);
        return ResponseEntity.ok(MailMapper.toDto(savedMail));
    }

    // Get all Mails
    @GetMapping
    public ResponseEntity<List<MailDto>> getAllMails() {
        List<Mail> mails = mailService.findAll();
        return ResponseEntity.ok(mails.stream()
                .map(MailMapper::toDto)
                .toList());
    }

    // Get a Mail by ID
    @GetMapping("/{id}")
    public ResponseEntity<MailDto> getMailById(@PathVariable Long id) {
        Mail mail = mailService.findById(id);
        if (mail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(MailMapper.toDto(mail));
    }

    @PostMapping("/sent")
    public ResponseEntity<String> sentMail(@RequestBody MailDto mailDto,  @RequestParam Long eventId){
        Mail mail = MailMapper.toEntity(mailDto);
        mailService.sendInvitaion(mail, eventId);
        return ResponseEntity.ok("The mail send Successfullly.");
    }

    // Update a Mail
    @PutMapping("/{id}")
    public ResponseEntity<MailDto> updateMail(@PathVariable Long id, @RequestBody MailDto mailDTO) {
        Mail existingMail = mailService.findById(id);
        if (existingMail == null) {
            return ResponseEntity.notFound().build();
        }

        // Update fields
        existingMail.setTo(mailDTO.getTo());
        existingMail.setSubject(mailDTO.getSubject());
        existingMail.setMessage(mailDTO.getMessage());
        existingMail.setTime(mailDTO.getTime());

        Mail updatedMail = mailService.save(existingMail);
        return ResponseEntity.ok(MailMapper.toDto(updatedMail));
    }

    // Delete a Mail
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMail(@PathVariable Long id) {
        if (!mailService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        mailService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}