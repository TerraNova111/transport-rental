package com.example.transportrental.components;

import com.example.transportrental.dto.booking.BookingDTO;
import com.example.transportrental.dto.booking.UserSummaryDTO;
import com.example.transportrental.dto.booking.VehicleSummaryDTO;
import com.example.transportrental.model.Booking;
import com.example.transportrental.model.User;
import com.example.transportrental.model.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    public BookingDTO toDto(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setStatus(booking.getStatus());

        User user = booking.getUser();
        UserSummaryDTO userDto = new UserSummaryDTO();
        userDto.setId(user.getId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        dto.setUser(userDto);

        Vehicle vehicle = booking.getVehicle();
        VehicleSummaryDTO vehicleDto = new VehicleSummaryDTO();
        vehicleDto.setId(vehicle.getId());
        vehicleDto.setName(vehicle.getName());
        dto.setVehicle(vehicleDto);

        return dto;
    }
}
