//package app.server.NexEvent.entitites;
//
//import jakarta.persistence.*;
//import lombok.*;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Builder
//@Entity
//@Table(name = "events")
//public class Event {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "name")
//    private String name;
//
//    @Column(name = "description")
//    private String desc;
//
//    @Column(name = "image")
//    private String image;
//
//    @Column(name = "hostName")
//    private String hostName;
//
//    @Column(name = "type")
//    private String type;
//
//    @Column(name = "status")
//    private String status;
//
//    @Column(name = "approval")
//    private Boolean approval;
//
//    @Column(name = "limits")
//    private Long limit;
//
//    @Column(name = "cal_name")
//    private String cal_name;
//
//    @Column(name = "starting_time")
//    private LocalDateTime startingTime;
//
//    @Column(name = "addressLink")
//    private String addressLink;
//
//    @Column(name = "ending_time")
//    private LocalDateTime endingTime;
//
//    @ManyToOne
//    @JoinColumn(name = "userProfile_id")
//    private UserProfile userProfile;
//
//    @ManyToOne
//    @JoinColumn(name = "calendar_id")
//    private Calendars calendars;
//
//    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Hosts> hosts;
//
//    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Guests> guests;
//
//    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Feedback> feedbacks;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "address_id", referencedColumnName = "id")
//    private Address address;
//}

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

    @Column(name = "description")
    private String desc;

    @Column(name = "image")
    private String image;

    @Column(name = "hostName")
    private String hostName;

    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private String status;

    @Column(name = "approval")
    private Boolean approval;

    @Column(name = "limits")
    private Long limit;

    @Column(name = "cal_name")
    private String cal_name;

    @Column(name = "starting_time")
    private LocalDateTime startingTime;

    @Column(name = "addressLink")
    private String addressLink;

    @Column(name = "ending_time")
    private LocalDateTime endingTime;

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
}
