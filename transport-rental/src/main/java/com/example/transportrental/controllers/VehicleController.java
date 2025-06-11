package com.example.transportrental.controllers;

import com.example.transportrental.dto.vehicle.VehicleDTO;
import com.example.transportrental.model.enums.ServiceCategory;
import com.example.transportrental.services.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {
    private final VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<List<VehicleDTO>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @GetMapping("/available")
    public ResponseEntity<List<VehicleDTO>> getAvailableVehicles(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) ServiceCategory serviceCategory
    ) {
        List<VehicleDTO> vehicles = vehicleService.getAvailableVehicles(category, serviceCategory);
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleDTO> getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleDtoById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = vehicleService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/categories-by-service")
    public ResponseEntity<List<String>> getCategories(
            @RequestParam(required = false) ServiceCategory serviceCategory) {
        List<String> categories = (serviceCategory != null)
                ? vehicleService.getCategoriesByServiceCategory(serviceCategory)
                : vehicleService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/service-categories")
    public ResponseEntity<List<String>> getServiceCategories() {
        List<String> serviceCategories = Arrays.stream(ServiceCategory.values())
                .map(Enum::name)
                .toList();
        return ResponseEntity.ok(serviceCategories);
    }

    @GetMapping("/{id}/availability")
    public boolean isVehicleAvailable(
            @PathVariable Long id,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return vehicleService.isVehicleAvailable(id, startDate, endDate);
    }

    @GetMapping("/{id}/available-quantity")
    public int getAvailableQuantity(
            @PathVariable Long id,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return vehicleService.getAvailableQuantity(id, startDate, endDate);
    }
}
