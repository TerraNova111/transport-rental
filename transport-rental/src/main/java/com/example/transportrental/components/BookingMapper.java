package com.example.transportrental.components;

import com.example.transportrental.dto.address.AddressDTO;
import com.example.transportrental.dto.booking.BookingDTO;
import com.example.transportrental.dto.booking.UserSummaryDTO;
import com.example.transportrental.dto.booking.VehicleSummaryDTO;
import com.example.transportrental.model.Address;
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
        dto.setPrice(booking.getPrice());
        dto.setServiceCategory(booking.getServiceCategory());

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

        AddressMapper addressMapper = new AddressMapper();

        if (booking.getDeliveryAddress() != null) {
            dto.setDeliveryAddress(addressMapper.toAddressDto(booking.getDeliveryAddress()));
        }
        if (booking.getLoadingAddress() != null) {
            dto.setLoadingAddress(addressMapper.toAddressDto(booking.getLoadingAddress()));
        }
        if (booking.getUnloadingAddress() != null) {
            dto.setUnloadingAddress(addressMapper.toAddressDto(booking.getUnloadingAddress()));
        }

        return dto;
    }


}
