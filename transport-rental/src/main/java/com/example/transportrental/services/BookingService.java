package com.example.transportrental.services;

import com.example.transportrental.components.BookingMapper;
import com.example.transportrental.dto.booking.BookingCreateDTO;
import com.example.transportrental.dto.booking.BookingDTO;
import com.example.transportrental.exceptions.VehicleUnavailableException;
import com.example.transportrental.model.Address;
import com.example.transportrental.model.Booking;
import com.example.transportrental.model.enums.BookingStatus;
import com.example.transportrental.model.User;
import com.example.transportrental.model.Vehicle;
import com.example.transportrental.model.enums.ServiceCategory;
import com.example.transportrental.repository.AddressRepository;
import com.example.transportrental.repository.BookingRepository;
import com.example.transportrental.repository.VehicleRepository;
import jakarta.transaction.Transactional;
import jakarta.xml.bind.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    private final AddressRepository addressRepository;
    private final UserService userService;
    private final VehicleService vehicleService;
    private final BookingMapper bookingMapper;
    private static final Logger log = LoggerFactory.getLogger(BookingService.class);

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

    public BookingDTO createBooking(BookingCreateDTO request) throws ValidationException {

        User user = userService.getCurrentUser();
        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Техника не найдена"));

        boolean available = vehicleService.isVehicleAvailable(vehicle.getId(), request.getStartDate(), request.getEndDate());
        if (!available) {
            throw new VehicleUnavailableException("Техника недоступна на выбранные даты");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setVehicle(vehicle);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setStatus(BookingStatus.PENDING);
        booking.setServiceCategory(request.getServiceCategory());
        validateBookingDates(bookingMapper.toDto(booking));

        if (request.getServiceCategory() == ServiceCategory.RENTAL) {
            if (request.getDeliveryAddressId() == null) {
                throw new IllegalArgumentException("Для аренды требуется Адрес доставки.");
            }
            Address deliveryAddress = addressRepository.findById(request.getDeliveryAddressId())
                    .orElseThrow(() -> new RuntimeException("Адрес доставки не найден."));
            booking.setDeliveryAddress(deliveryAddress);

        } else if (request.getServiceCategory() == ServiceCategory.TRANSPORT) {
            if (request.getLoadingAddressId() == null || request.getUnloadingAddressId() == null) {
                throw new IllegalArgumentException("Для транспортировки требуются Адрес загрузки и Адрес выгрузки.");
            }
            Address loadingAddress = addressRepository.findById(request.getLoadingAddressId())
                    .orElseThrow(() -> new RuntimeException("Адрес загрузки не найден."));
            Address unloadingAddress = addressRepository.findById(request.getUnloadingAddressId())
                    .orElseThrow(() -> new RuntimeException("Адрес выгрузки не найден."));
            booking.setLoadingAddress(loadingAddress);
            booking.setUnloadingAddress(unloadingAddress);
        } else {
            throw new IllegalArgumentException("Неверная категория услуги.");
        }

        Booking savedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(savedBooking);
    }

    public BookingDTO updateBooking(Long id, BookingDTO request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Бронирование не найдено"));

        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());

        booking.setServiceCategory(request.getServiceCategory());

        return bookingMapper.toDto(bookingRepository.save(booking));
    }

    public void deleteBooking(Long id) {
        try {
            bookingRepository.deleteById(id);
        } catch (EmptyResultDataAccessException | ObjectOptimisticLockingFailureException e) {
            log.warn("Booking with id={} was already deleted or locked by another transaction", id);
        }
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

    private void validateBookingDates(BookingDTO dto) throws ValidationException {
        if (dto.getServiceCategory() == ServiceCategory.RENTAL) {
            if (dto.getStartDate() == null || dto.getEndDate() == null) {
                throw new ValidationException("Dates are required for rental services");
            }
        }
    }

}
