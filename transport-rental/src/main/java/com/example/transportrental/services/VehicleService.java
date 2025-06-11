package com.example.transportrental.services;

import com.example.transportrental.dto.vehicle.VehicleDTO;
import com.example.transportrental.model.Vehicle;
import com.example.transportrental.model.enums.BookingStatus;
import com.example.transportrental.model.enums.ServiceCategory;
import com.example.transportrental.repository.BookingRepository;
import com.example.transportrental.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    private final BookingRepository bookingRepository;

    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public Optional<VehicleDTO> getVehicleDtoById(Long id) {
        return vehicleRepository.findById(id).map(this::mapToDto);
    }

    public List<VehicleDTO> getAvailableVehicles(String category, ServiceCategory serviceCategory) {
        List<Vehicle> vehicles;

        if (category != null && serviceCategory != null) {
            vehicles = vehicleRepository.findByAvailableTrueAndCategoryAndServiceCategory(category, serviceCategory);
        } else if (category != null) {
            vehicles = vehicleRepository.findByAvailableTrueAndCategory(category);
        } else if (serviceCategory != null) {
            vehicles = vehicleRepository.findByAvailableTrueAndServiceCategory(serviceCategory);
        } else {
            vehicles = vehicleRepository.findByAvailableTrue();
        }

        return vehicles.stream()
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

    public List<String> getAllCategories() {
        return vehicleRepository.findDistinctCategories();
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
            vehicle.setQuantity(dto.getQuantity());
            vehicle.setAvailable(dto.isAvailable());
            vehicle.setPricePerDay(dto.getPricePerDay());
            vehicle.setImageUrl(fileName);
            vehicle.setServiceCategory(dto.getServiceCategory());
            vehicle.setDescriptionDetailed(dto.getDescriptionDetailed());

            vehicleRepository.save(vehicle);
        } catch (IOException e) {
            throw new RuntimeException("Ошибка при сохранении изображени", e);
        }
    }

    public void updateVehicleImage(Long vehicleId, MultipartFile imageFile) {
        try {
            Vehicle vehicle = vehicleRepository.findById(vehicleId)
                    .orElseThrow(() -> new RuntimeException("Техника с ID " + vehicleId + " не найдена"));

            if (vehicle.getImageUrl() != null) {
                Path oldFilePath = Paths.get("uploads").resolve(vehicle.getImageUrl());
                Files.deleteIfExists(oldFilePath);
            }

            String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path uploadDir = Paths.get("uploads");
            Files.createDirectories(uploadDir);
            Path filePath = uploadDir.resolve(fileName);
            Files.write(filePath, imageFile.getBytes());

            vehicle.setImageUrl(fileName);
            vehicleRepository.save(vehicle);

        } catch (IOException e) {
            throw new RuntimeException("Ошибка при обновлении изображения", e);
        }
    }

    public void updateVehicle(VehicleDTO dto, Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicle.setName(dto.getName());
        vehicle.setCategory(dto.getCategory());
        vehicle.setDescription(dto.getDescription());
        vehicle.setDescriptionDetailed(dto.getDescriptionDetailed());
        vehicle.setPricePerDay(dto.getPricePerDay());
        vehicle.setQuantity(dto.getQuantity());
        vehicle.setServiceCategory(dto.getServiceCategory());
        vehicle.setDescriptionDetailed(dto.getDescriptionDetailed());

        vehicleRepository.save(vehicle);
    }

    private VehicleDTO mapToDto(Vehicle vehicle) {
        VehicleDTO dto = new VehicleDTO();
        dto.setId(vehicle.getId());
        dto.setName(vehicle.getName());
        dto.setCategory(vehicle.getCategory());
        dto.setDescription(vehicle.getDescription());
        dto.setAvailable(vehicle.isAvailable());
        dto.setQuantity(vehicle.getQuantity());
        dto.setPricePerDay(vehicle.getPricePerDay());
        dto.setImageUrl(vehicle.getImageUrl());
        dto.setServiceCategory(vehicle.getServiceCategory());
        dto.setDescriptionDetailed(vehicle.getDescriptionDetailed());

        return dto;
    }

    public List<String> getCategoriesByServiceCategory(ServiceCategory serviceCategory) {
        return vehicleRepository.findDistinctCategoriesByServiceCategory(serviceCategory);
    }

    public boolean isVehicleAvailable(Long vehicleId, LocalDate startDate, LocalDate endDate) {
        int totalQuantity = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Техника не найдена"))
                .getQuantity();

        List<BookingStatus> statuses = List.of(BookingStatus.PENDING, BookingStatus.APPROVED, BookingStatus.PAID);

        int bookedCount = bookingRepository.countActiveBookings(vehicleId, startDate, endDate, statuses);

        return bookedCount < totalQuantity;
    }

    public int getAvailableQuantity(Long vehicleId, LocalDate startDate, LocalDate endDate) {
        int totalQuantity = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Техника не найдена"))
                .getQuantity();

        List<BookingStatus> statuses = List.of(BookingStatus.PENDING, BookingStatus.APPROVED, BookingStatus.PAID);

        int bookedCount = bookingRepository.countActiveBookings(vehicleId, startDate, endDate, statuses);

        return totalQuantity - bookedCount;
    }
}
