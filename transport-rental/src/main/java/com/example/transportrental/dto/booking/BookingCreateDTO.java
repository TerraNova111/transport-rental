package com.example.transportrental.dto.booking;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingCreateDTO {
    private Long vehicleId;
    private LocalDate startDate;
    private LocalDate endDate;
}