package app.server.NexEvent.entitites;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "mails")
public class Mail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tos")
    private List<String> to;

    @Column(name = "name")
    private String subject;

    @Column(name = "emails")
    private String message;

    @Column(name = "time")
    private LocalDateTime time;


}
