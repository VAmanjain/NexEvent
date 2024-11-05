package app.server.NexEvent.entitites;

import app.server.NexEvent.auth.entities.User;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "userProfile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "bio")
    private String bio;

    @Column(name = "image")
    private String image;

    @Column(name = "phone_no")
    private Long phoneNo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "social_id", referencedColumnName = "id")
    private SocailMedia socailMedia;
//
    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Calendars> calendars;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Event> events;

}
