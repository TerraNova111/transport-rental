package com.example.transportrental.components;

import com.example.transportrental.model.Address;
import com.example.transportrental.model.Vehicle;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
public class PriceCalculator {

    public static BigDecimal calculateTransportServicePrice(Vehicle vehicle, Address loading, Address unloading) {
        double distanceKm = DistanceCalculator.calculateDistance(
                loading.getLatitude(), loading.getLongitude(),
                unloading.getLatitude(), unloading.getLongitude()
        );

        BigDecimal distance = BigDecimal.valueOf(distanceKm);
        BigDecimal ratePerKm = vehicle.getRatePerKm();
        if (ratePerKm == null) {
            throw new IllegalArgumentException("У транспорта не задана цена за километр");
        }

        return ratePerKm.multiply(distance).setScale(2, RoundingMode.HALF_UP);
    }
}