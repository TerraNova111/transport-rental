package com.example.transportrental.dto.address;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateAddressDTO {
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
