package app.server.NexEvent.entitites;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "TEXT" )
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "hostName")
    private String hostName;

    @Column(name = "is_private")
    private Boolean isPrivate;

    @Column(name = "status")
    private String status;

    @Column(name = "approval")
    private Boolean approval;

    @Column(name = "limits")
    private Long limit;

    @Column(name = "calendarName")
    private String calendarName;

    @Column(name = "starting_time")
    private LocalDateTime startingTime;

    @Column(name = "addressLink")
    private String addressLink;

    @Column(name = "ending_time")
    private LocalDateTime endingTime;

    @ElementCollection
    @Column(name = "invitedEmails")
    private List<String> invitedEmails;

    @ManyToOne
    @JoinColumn(name = "userProfile_id")
    private UserProfile userProfile;

    @ManyToOne
    @JoinColumn(name = "calendar_id")
    private Calendars calendars;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Hosts> hosts;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Guests> guests;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Feedback> feedbacks;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;



    public boolean isPrivate() {
        return isPrivate;
    }
}
