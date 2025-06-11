package com.example.transportrental.services;

import com.example.transportrental.model.Address;
import com.example.transportrental.model.Booking;
import com.example.transportrental.model.Vehicle;
import com.example.transportrental.model.enums.ServiceCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class PricingService {
    
    public BigDecimal calculatePrice(Booking booking) {
        if (booking.getServiceCategory() == ServiceCategory.RENTAL) {
            long days = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate());
            return booking.getVehicle().getPricePerDay().multiply(BigDecimal.valueOf(days));
        } else {
            return calculateTransportPrice(booking);
        }
    }

    private BigDecimal calculateTransportPrice(Booking booking) {
        Vehicle vehicle = booking.getVehicle();

        double distance = calculateDistance(
                booking.getLoadingAddress(),
                booking.getUnloadingAddress()
        );

        BigDecimal pricePerKm = vehicle.getTransportPricePerKm();
        BigDecimal baseFee = vehicle.getTransportBaseFee();

        BigDecimal distancePrice = pricePerKm.multiply(BigDecimal.valueOf(distance));

        if (distance > 500) {
            int estimatedDays = (int) Math.ceil(distance / 800);
            BigDecimal dailyFee = vehicle.getPricePerDay().multiply(BigDecimal.valueOf(0.3));
            distancePrice = distancePrice.add(dailyFee.multiply(BigDecimal.valueOf(estimatedDays)));
        }

        return baseFee.add(distancePrice);
    }

    private double calculateDistance(Address from, Address to) {
        double lat1 = Math.toRadians(from.getLatitude().doubleValue());
        double lon1 = Math.toRadians(from.getLongitude().doubleValue());
        double lat2 = Math.toRadians(to.getLatitude().doubleValue());
        double lon2 = Math.toRadians(to.getLongitude().doubleValue());

        double dlat = lat2 - lat1;
        double dlon = lon2 - lon1;

        double a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                        Math.sin(dlon / 2) * Math.sin(dlon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return 6371 * c;
    }
}