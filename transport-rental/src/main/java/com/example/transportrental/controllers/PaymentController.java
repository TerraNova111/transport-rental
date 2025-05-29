package com.example.transportrental.controllers;

import com.example.transportrental.dto.payment.PaymentRequestDTO;
import com.example.transportrental.services.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final StripeService stripeService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createSession(@RequestBody PaymentRequestDTO request) {
        try {
            String sessionUrl = stripeService.createCheckoutSession(
                    request.getBookingId(),
                    request.getVehicleName(),
                    request.getAmount()
            );
            return ResponseEntity.ok(Map.of("url", sessionUrl));
        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}