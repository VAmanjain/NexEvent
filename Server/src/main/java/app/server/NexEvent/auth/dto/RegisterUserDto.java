package app.server.NexEvent.auth.dto;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserDto {
    private Long id;
    private String email;
    private String password;
    private String fullName;

    @Override
    public String toString() {
        return "RegisterUserInfoDto{" +
                "id='" + id + '\'' +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", fullName='" + fullName + '\'' +
                '}';
    }
}
