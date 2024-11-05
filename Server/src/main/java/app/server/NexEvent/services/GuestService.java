package app.server.NexEvent.services;

import app.server.NexEvent.dtos.GuestDto;
import app.server.NexEvent.entitites.Guests;

import java.util.List;

public interface GuestService {
    public List<GuestDto> getAllGuests();

    public GuestDto getGuestById(Long id);

    public GuestDto createGuest(GuestDto guestDto);

    public GuestDto updateGuest(Long id, GuestDto guestDto);

    public void deleteGuest(Long id);

    public List<GuestDto> getGuestsByEventId(Long eventId) ;
}
