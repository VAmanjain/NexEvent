package app.server.NexEvent.mapper;


import app.server.NexEvent.dtos.MailDto;
import app.server.NexEvent.entitites.Mail;

public class MailMapper {

    // Convert Mail entity to MailDTO
    public static MailDto toDto(Mail mail) {
        if (mail == null) {
            return null;
        }
        return MailDto.builder()
                .id(mail.getId())
                .to(mail.getTo())
                .subject(mail.getSubject())
                .message(mail.getMessage())
                .time(mail.getTime())
                .build();
    }

    // Convert MailDTO to Mail entity
    public static Mail toEntity(MailDto mailDTO) {
        if (mailDTO == null) {
            return null;
        }
        return Mail.builder()
                .id(mailDTO.getId())
                .to(mailDTO.getTo())
                .subject(mailDTO.getSubject())
                .message(mailDTO.getMessage())
                .time(mailDTO.getTime())
                .build();
    }
}