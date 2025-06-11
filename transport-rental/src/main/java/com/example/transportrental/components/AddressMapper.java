package com.example.transportrental.components;

import com.example.transportrental.dto.address.AddressDTO;
import com.example.transportrental.model.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {
    public AddressDTO toAddressDto(Address address) {
        AddressDTO dto = new AddressDTO();
        dto.setId(address.getId());
        dto.setStreet(address.getStreet());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setZipCode(address.getZipCode());
        dto.setCountry(address.getCountry());
        dto.setLatitude(address.getLatitude());
        dto.setLongitude(address.getLongitude());
        return dto;
    }
}
