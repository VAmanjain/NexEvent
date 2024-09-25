package app.server.NexEvent.entitites;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "calendars")
public class Calendars {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cal_name")
    private String cal_name;

    @Column(name = "owner_name")
    private String ownerName;

    @OneToMany(mappedBy = "calendars", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Event> events;

    @ManyToOne
    @JoinColumn(name = "userProfile_id")
    private UserProfile userProfile;

}
