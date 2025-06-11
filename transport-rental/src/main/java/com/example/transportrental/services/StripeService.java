package com.example.transportrental.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StripeService {

    @Value("${stripe.secret-key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public String createCheckoutSession(Long bookingId, String name, Long amountInTenges) throws StripeException {
        if (bookingId == null || name == null || amountInTenges == null) {
            throw new IllegalArgumentException("bookingId, name или amount не могут быть null");
        }

        long amountInUsdCents = Math.round(((float) amountInTenges / 500) * 100);

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/payment-success?bookingId=" + bookingId)
                .setCancelUrl("http://localhost:5173/payment-cancel?bookingId=" + bookingId)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount(amountInUsdCents)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Бронирование: " + name)
                                                                .build())
                                                .build())
                                .build())
                .putMetadata("bookingId", String.valueOf(bookingId))
                .build();

        Session session = Session.create(params);
        System.out.println("Создание Stripe-сессии: bookingId=" + bookingId + ", name=" + name + ", amount=" + amountInTenges);
        return session.getUrl();
    }
}