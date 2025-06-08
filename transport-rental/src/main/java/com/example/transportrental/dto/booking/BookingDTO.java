package com.example.transportrental.dto.booking;

import com.example.transportrental.model.enums.BookingStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingDTO {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private BookingStatus status;
    private UserSummaryDTO user;
    private VehicleSummaryDTO vehicle;
}
