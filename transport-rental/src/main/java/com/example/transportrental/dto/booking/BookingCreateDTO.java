package com.example.transportrental.dto.booking;

import com.example.transportrental.model.enums.ServiceCategory;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingCreateDTO {
    private Long vehicleId;
    private LocalDate startDate;
    private LocalDate endDate;
    private ServiceCategory serviceCategory;

    private Long deliveryAddressId;

    private Long loadingAddressId;
    private Long unloadingAddressId;
}