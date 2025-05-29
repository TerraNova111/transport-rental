package com.example.transportrental.dto.vehicle;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private BigDecimal pricePerDay;
    private boolean available;
    private String imageUrl;
}
