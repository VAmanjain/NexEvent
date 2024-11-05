package app.server.NexEvent.controller;

import app.server.NexEvent.dtos.GuestDto;
import app.server.NexEvent.services.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guests")
public class GuestController {

    @Autowired
    private GuestService guestService;

    @GetMapping
    public ResponseEntity<List<GuestDto>> getAllGuests() {
        List<GuestDto> guests = guestService.getAllGuests();
        return ResponseEntity.ok(guests);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<GuestDto>> getGuestsByEventId(@PathVariable Long eventId) {
        List<GuestDto> guests = guestService.getGuestsByEventId(eventId);
        return ResponseEntity.ok(guests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuestDto> getGuestById(@PathVariable Long id) {
        GuestDto guest = guestService.getGuestById(id);
        return ResponseEntity.ok(guest);
    }

    @PostMapping
    public ResponseEntity<GuestDto> createGuest(@RequestBody GuestDto guestDto) {
        GuestDto createdGuest = guestService.createGuest(guestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGuest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GuestDto> updateGuest(@PathVariable Long id, @RequestBody GuestDto guestDto) {
        GuestDto updatedGuest = guestService.updateGuest(id, guestDto);
        return ResponseEntity.ok(updatedGuest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        guestService.deleteGuest(id);
        return ResponseEntity.noContent().build();
    }
}
