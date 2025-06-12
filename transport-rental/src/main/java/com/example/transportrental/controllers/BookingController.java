package com.example.transportrental.controllers;

import com.example.transportrental.dto.booking.BookingCreateDTO;
import com.example.transportrental.dto.booking.BookingDTO;
import com.example.transportrental.model.enums.BookingStatus;
import com.example.transportrental.model.User;
import com.example.transportrental.repository.UserRepository;
import com.example.transportrental.services.BookingService;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final UserRepository userRepository;

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
    public BookingDTO createBooking(@RequestBody BookingCreateDTO request) throws ValidationException {
        return bookingService.createBooking(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingDTO updateBooking(@PathVariable Long id, @RequestBody BookingDTO request) {
        return bookingService.updateBooking(id, request);
    }

    @DeleteMapping("/{id}")
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

    @PostMapping("/rejected/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public BookingDTO cancelBooking(@PathVariable Long id) {
        return bookingService.cancelBooking(id);
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<BookingDTO> getMyBookings(Principal principal) {
        String email = principal.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return bookingService.getBookingByUser(user.getId());
    }

    @PostMapping("/{id}/request-return")
    @PreAuthorize("hasRole('USER')")
    public BookingDTO requestReturn(@PathVariable Long id) {
        return bookingService.requestReturn(id);
    }

    @PostMapping("/{id}/confirm-return")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingDTO confirmReturn(@PathVariable Long id) {
        return bookingService.confirmReturn(id);
    }

}
