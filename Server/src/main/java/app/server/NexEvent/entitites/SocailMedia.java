package app.server.NexEvent.entitites;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "socailMedia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SocailMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "insta")
    private String insta;

    @Column(name = "twitter")
    private String twitter;

    @Column(name = "linkedIn")
    private String linkedIn;
}
