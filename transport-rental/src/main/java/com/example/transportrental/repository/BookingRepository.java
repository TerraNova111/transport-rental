package com.example.transportrental.repository;

import com.example.transportrental.model.Booking;
import com.example.transportrental.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStatus(BookingStatus status);

    List<Booking> findByUserId(Long userId);
}