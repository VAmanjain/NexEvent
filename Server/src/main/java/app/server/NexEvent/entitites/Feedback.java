package app.server.NexEvent.entitites;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String review;

    private String email;

    private Integer rate;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

}
