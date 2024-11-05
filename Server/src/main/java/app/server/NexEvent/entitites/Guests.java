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
@Table(name = "guests")
public class Guests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "emails")
    private String emails;

    @Column(name = "guest_id")
    private Long guestId;

    @Column(name = "guestCode")
    private String guestCode;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(name = "entry_id")
    private String entryId;

    @Column(name = "status")
    private String status;

}

