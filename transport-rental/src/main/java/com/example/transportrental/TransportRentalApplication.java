package com.example.transportrental;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TransportRentalApplication {

    public static void main(String[] args) {
        SpringApplication.run(TransportRentalApplication.class, args);

    }
}



