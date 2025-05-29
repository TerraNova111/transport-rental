package com.example.transportrental.services;

import com.example.transportrental.components.BookingMapper;
import com.example.transportrental.dto.booking.BookingCreateDTO;
import com.example.transportrental.dto.booking.BookingDTO;
import com.example.transportrental.model.Booking;
import com.example.transportrental.model.BookingStatus;
import com.example.transportrental.model.User;
import com.example.transportrental.model.Vehicle;
import com.example.transportrental.repository.BookingRepository;
import com.example.transportrental.repository.VehicleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    private final UserService userService;
    private final BookingMapper bookingMapper;


    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(bookingMapper::toDto)
                .toList();
    }

    public List<BookingDTO> getBookingByUser(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(bookingMapper::toDto)
                .toList();
    }

    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Бронирование не найдено"));
        return bookingMapper.toDto(booking);
    }

    public Booking createBooking(BookingCreateDTO request) {
        User user = userService.getCurrentUser();
        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Техника не найдена"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setVehicle(vehicle);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setStatus(BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    public BookingDTO updateBooking(Long id, BookingDTO request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Бронирование не найдено"));

        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());

        return bookingMapper.toDto(bookingRepository.save(booking));
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public List<BookingDTO> getBookingByStatus(BookingStatus status) {
        return bookingRepository.findByStatus(status).stream()
                .map(bookingMapper::toDto)
                .toList();
    }

    public BookingDTO updateBookingStatus(Long id, BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Бронирование не найдено"));

        booking.setStatus(status);
        return bookingMapper.toDto(bookingRepository.save(booking));
    }

    public BookingDTO approveBooking(Long id) {
        return updateBookingStatus(id, BookingStatus.APPROVED);
    }

    @Transactional
    public void markAsPaid(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Бронирование не найдено"));
        booking.setStatus(BookingStatus.PAID);
        bookingRepository.save(booking);
    }
}
