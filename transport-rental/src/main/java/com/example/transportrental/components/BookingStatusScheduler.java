package com.example.transportrental.components;

import com.example.transportrental.services.BookingService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class BookingStatusScheduler {
    private final BookingService bookingService;

    public BookingStatusScheduler(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void updateStatusToInProgress() {
        bookingService.updateBookingsToInProgress();
    }
}