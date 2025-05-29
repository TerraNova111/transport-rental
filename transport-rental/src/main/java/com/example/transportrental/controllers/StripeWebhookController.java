package com.example.transportrental.controllers;

import com.example.transportrental.services.BookingService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhook")
@RequiredArgsConstructor
public class StripeWebhookController {

    @Value("${stripe.webhook-secret}")
    private String endpointSecret;

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload,
                                                    @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            System.out.println("=== Stripe Webhook event type: " + event.getType());
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();

            Session session = null;

            if (dataObjectDeserializer.getObject().isPresent()) {
                session = (Session) dataObjectDeserializer.getObject().get();
            } else {
                try {
                    session = ApiResource.GSON.fromJson(
                            event.getData().getObject().toJson(),
                            Session.class
                    );
                } catch (Exception e) {
                    System.out.println("Ошибка десериализации Session из JSON: " + e.getMessage());
                }
            }

            if (session != null) {
                String bookingIdStr = session.getMetadata().get("bookingId");

                Long bookingId = Long.parseLong(bookingIdStr);
                bookingService.markAsPaid(bookingId);
            } else {
                System.out.println("Не удалось десериализовать session объект из webhook event.");
            }
        }

        return ResponseEntity.ok("Received");
    }
}
