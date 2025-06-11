package com.example.transportrental.services;

import com.example.transportrental.components.AddressMapper;
import com.example.transportrental.dto.address.AddressDTO;
import com.example.transportrental.dto.address.CreateAddressDTO;
import com.example.transportrental.model.Address;
import com.example.transportrental.model.User;
import com.example.transportrental.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserService userService;
    private final AddressMapper addressMapper;

    public AddressDTO createAddress(CreateAddressDTO request) {
        User currentUser = userService.getCurrentUser();

        Address address = new Address();
        address.setUser(currentUser);
        address.setLatitude(request.getLatitude());
        address.setLongitude(request.getLongitude());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setZipCode(request.getZipCode());
        address.setCountry(request.getCountry());

        Address savedAddress = addressRepository.save(address);
        return addressMapper.toAddressDto(savedAddress);
    }

    public AddressDTO getAddressById(Long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Адрес не найден"));
        return addressMapper.toAddressDto(address);
    }

    public List<AddressDTO> getUserAddresses() {
        User currentUser = userService.getCurrentUser();
        List<Address> addresses = addressRepository.findByUserId(currentUser.getId());
        return addresses.stream()
                .map(addressMapper::toAddressDto)
                .collect(Collectors.toList());
    }
}
