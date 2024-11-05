package app.server.NexEvent.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AddressDto {
    private Long id;
    private String houseNo;
    private String street;
    private String city;
    private String state;
    private String country;
}