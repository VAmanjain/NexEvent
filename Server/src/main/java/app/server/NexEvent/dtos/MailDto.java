package app.server.NexEvent.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MailDto {
    private Long id;
    private List<String> to;
    private String subject;
    private String message;
    private Long time;
}