package com.example.transportrental.services;

import com.example.transportrental.dto.vehicle.VehicleDTO;
import com.example.transportrental.model.Vehicle;
import com.example.transportrental.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public Optional<VehicleDTO> getVehicleDtoById(Long id) {
        return vehicleRepository.findById(id).map(this::mapToDto);
    }

    public List<VehicleDTO> getAvailableVehicles() {
        return vehicleRepository.findByAvailableTrue()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (vehicle.getImageUrl() != null) {
            Path imagePath = Paths.get("uploads").resolve(vehicle.getImageUrl());
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                System.err.println("Не удалось удалить файл изображения: " + imagePath + e.getMessage());
            }
        }

        vehicleRepository.deleteById(id);
    }

    public void createVehicleWithImage(VehicleDTO dto, MultipartFile imageFile) {
        try {
            String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path uploadDir = Paths.get("uploads");
            Files.createDirectories(uploadDir);
            Path filePath = uploadDir.resolve(fileName);
            Files.write(filePath, imageFile.getBytes());

            Vehicle vehicle = new Vehicle();
            vehicle.setName(dto.getName());
            vehicle.setCategory(dto.getCategory());
            vehicle.setDescription(dto.getDescription());
            vehicle.setAvailable(dto.isAvailable());
            vehicle.setPricePerDay(dto.getPricePerDay());
            vehicle.setImageUrl(fileName);

            vehicleRepository.save(vehicle);
        } catch (IOException e) {
            throw new RuntimeException("Ошибка при сохранении изображени", e);
        }
    }

    public void updateVehicle(VehicleDTO dto, Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicle.setName(dto.getName());
        vehicle.setCategory(dto.getCategory());
        vehicle.setDescription(dto.getDescription());
        vehicle.setAvailable(dto.isAvailable());
        vehicle.setPricePerDay(dto.getPricePerDay());

        vehicleRepository.save(vehicle);
    }

    private VehicleDTO mapToDto(Vehicle vehicle) {
        VehicleDTO dto = new VehicleDTO();
        dto.setId(vehicle.getId());
        dto.setName(vehicle.getName());
        dto.setCategory(vehicle.getCategory());
        dto.setDescription(vehicle.getDescription());
        dto.setAvailable(vehicle.isAvailable());
        dto.setPricePerDay(vehicle.getPricePerDay());
        dto.setImageUrl(vehicle.getImageUrl());
        return dto;
    }
}
