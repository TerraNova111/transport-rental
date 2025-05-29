package com.example.transportrental.controllers;

import com.example.transportrental.components.BookingMapper;
import com.example.transportrental.dto.booking.BookingCreateDTO;
import com.example.transportrental.dto.booking.BookingDTO;
import com.example.transportrental.model.Booking;
import com.example.transportrental.model.BookingStatus;
import com.example.transportrental.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final BookingMapper bookingMapper;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<BookingDTO> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingDTO getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public BookingDTO createBooking(@RequestBody BookingCreateDTO request) {
        Booking booking = bookingService.createBooking(request);
        return bookingMapper.toDto(booking);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingDTO updateBooking(@PathVariable Long id, @RequestBody BookingDTO request) {
        return bookingService.updateBooking(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<BookingDTO> getBookingsByStatus(@PathVariable BookingStatus status) {
        return bookingService.getBookingByStatus(status);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<BookingDTO> getBookingsByUserId(@PathVariable Long userId) {
        return bookingService.getBookingByUser(userId);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> rejectBooking(@PathVariable Long id) {
        bookingService.updateBookingStatus(id, BookingStatus.CANCELED);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/approved/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingDTO approveBooking(@PathVariable Long id) {
        return bookingService.approveBooking(id);
    }
}
