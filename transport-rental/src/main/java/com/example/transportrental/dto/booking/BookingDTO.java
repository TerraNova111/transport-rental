package com.example.transportrental.dto.booking;

import com.example.transportrental.dto.address.AddressDTO;
import com.example.transportrental.model.enums.BookingStatus;
import com.example.transportrental.model.enums.ServiceCategory;

import java.math.BigDecimal;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingDTO {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private BookingStatus status;
    private ServiceCategory serviceCategory;
    private BigDecimal price;

    private UserSummaryDTO user;
    private VehicleSummaryDTO vehicle;

    private AddressDTO deliveryAddress;
    private AddressDTO loadingAddress;
    private AddressDTO unloadingAddress;
}
