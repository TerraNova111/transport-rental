package com.example.transportrental.dto.vehicle;

import com.example.transportrental.model.enums.ServiceCategory;
import com.example.transportrental.model.enums.WorkCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Map;

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
    private Integer quantity;
    private boolean available;
    private String imageUrl;
    private ServiceCategory serviceCategory;
    private WorkCategory workCategory;
    private Map<String, Object> descriptionDetailed;
}
