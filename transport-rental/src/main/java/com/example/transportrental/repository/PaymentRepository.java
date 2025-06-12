package com.example.transportrental.repository;

import com.example.transportrental.model.Booking;
import com.example.transportrental.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
