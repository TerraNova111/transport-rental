package com.example.transportrental.services;

import com.example.transportrental.components.BookingMapper;
import com.example.transportrental.dto.booking.BookingCreateDTO;
import com.example.transportrental.dto.booking.BookingDTO;
import com.example.transportrental.exceptions.VehicleUnavailableException;
import com.example.transportrental.model.Booking;
import com.example.transportrental.model.enums.BookingStatus;
import com.example.transportrental.model.User;
import com.example.transportrental.model.Vehicle;
import com.example.transportrental.repository.BookingRepository;
import com.example.transportrental.repository.VehicleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


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

    public BookingDTO createBooking(BookingCreateDTO request) {
        User user = userService.getCurrentUser();
        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Техника не найдена"));

        boolean available = isVehicleAvailable(vehicle.getId(), request.getStartDate(), request.getEndDate());
        if (!available) {
            throw new VehicleUnavailableException("Техника недоступна на выбранные даты");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setVehicle(vehicle);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setStatus(BookingStatus.PENDING);

        Booking savedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(savedBooking);
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

    public BookingDTO cancelBooking(Long id) {
        return updateBookingStatus(id, BookingStatus.CANCELED);
    }

    @Transactional
    public void markAsPaid(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Бронирование не найдено"));
        booking.setStatus(BookingStatus.PAID);
        bookingRepository.save(booking);
    }

    public boolean isVehicleAvailable(Long vehicleId, LocalDate startDate, LocalDate endDate) {
        int totalQuantity = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Техника не найдена"))
                .getQuantity();

        List<BookingStatus> statuses = List.of(BookingStatus.PENDING, BookingStatus.APPROVED, BookingStatus.PAID);

        int bookedCount = bookingRepository.countActiveBookings(vehicleId, startDate, endDate, statuses);

        return bookedCount < totalQuantity;
    }

}
