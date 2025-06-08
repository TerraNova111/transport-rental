package com.example.transportrental.repository;

import com.example.transportrental.model.Booking;
import com.example.transportrental.model.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStatus(BookingStatus status);

    List<Booking> findByUserId(Long userId);

    @Query("SELECT COUNT(b) FROM Booking b " +
            "WHERE b.vehicle.id = :vehicleId " +
            "AND b.status IN :statuses " +
            "AND b.endDate >= :startDate " +
            "AND b.startDate <= :endDate")
    int countActiveBookings(@Param("vehicleId") Long vehicleId,
                            @Param("startDate") LocalDate startDate,
                            @Param("endDate") LocalDate endDate,
                            @Param("statuses") List<BookingStatus> statuses);
}