package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.HostDto;
import app.server.NexEvent.entitites.Event;
import app.server.NexEvent.entitites.Hosts;
import app.server.NexEvent.entitites.UserProfile;
import org.apache.catalina.Host;

public class HostsMapper {

    public static Hosts mapToHost(HostDto hostDto){
        Hosts hosts = Hosts.builder()
                .id(hostDto.getId())
                .name(hostDto.getName())
                .email(hostDto.getEmail())
                .role(hostDto.getRole())
                .event(Event.builder().id(hostDto.getEventId()).build())
                .build();
        return hosts;
    }

}
