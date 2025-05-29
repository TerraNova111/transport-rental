package com.example.transportrental.controllers;

import com.example.transportrental.dto.vehicle.VehicleDTO;
import com.example.transportrental.services.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    private final VehicleService vehicleService;

    @GetMapping("/vehicles")
    public ResponseEntity<List<VehicleDTO>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @PostMapping("/vehicles")
    public ResponseEntity<?> addVehicle(
            @RequestPart("vehicle") VehicleDTO vehicleDTO,
            @RequestPart("image") MultipartFile imageFile
    ) {
        vehicleService.createVehicleWithImage(vehicleDTO, imageFile);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/vehicles/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok().build();
    }


}
