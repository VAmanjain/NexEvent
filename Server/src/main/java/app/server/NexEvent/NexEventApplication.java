package app.server.NexEvent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NexEventApplication {

	public static void main(String[] args) {
		SpringApplication.run(NexEventApplication.class, args);
	}


}
