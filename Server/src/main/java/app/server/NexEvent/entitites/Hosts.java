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
@Table(name = "hosts")
public class  Hosts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "role")
    private String role;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}