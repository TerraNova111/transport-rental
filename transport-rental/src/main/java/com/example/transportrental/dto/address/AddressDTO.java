package com.example.transportrental.dto.address;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddressDTO {
    private Long id;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
