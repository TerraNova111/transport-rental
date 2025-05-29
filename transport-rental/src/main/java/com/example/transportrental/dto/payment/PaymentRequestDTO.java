package com.example.transportrental.dto.payment;

import lombok.Data;

@Data
public class PaymentRequestDTO {
    private Long bookingId;
    private String vehicleName;
    private Long amount;
}