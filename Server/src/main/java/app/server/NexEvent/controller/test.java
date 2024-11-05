package app.server.NexEvent.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/check")
public class test {

    @GetMapping
    public ResponseEntity<String > checkingWorking(){
        return ResponseEntity.ok("hello from outside auth package.");
    }
}
