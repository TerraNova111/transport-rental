package com.example.transportrental.controllers;

import com.example.transportrental.dto.address.AddressDTO;
import com.example.transportrental.dto.address.CreateAddressDTO;
import com.example.transportrental.services.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<AddressDTO> createAddress(@RequestBody CreateAddressDTO request) {
        AddressDTO address = addressService.createAddress(request);
        return ResponseEntity.ok(address);
    }
}
