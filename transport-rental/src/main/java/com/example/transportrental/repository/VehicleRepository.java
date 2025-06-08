package com.example.transportrental.repository;

import com.example.transportrental.model.Vehicle;
import com.example.transportrental.model.enums.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByAvailableTrue();

    @Query("SELECT DISTINCT v.category FROM Vehicle v")
    List<String> findDistinctCategories();

    List<Vehicle> findByAvailableTrueAndCategory(String category);

    List<Vehicle> findByAvailableTrueAndServiceCategory(ServiceCategory serviceCategory);

    List<Vehicle> findByAvailableTrueAndCategoryAndServiceCategory(String category, ServiceCategory serviceCategory);

    @Query("SELECT DISTINCT v.category FROM Vehicle v WHERE v.serviceCategory = :serviceCategory")
    List<String> findDistinctCategoriesByServiceCategory(@Param("serviceCategory") ServiceCategory serviceCategory);
}