package com.example.transportrental.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private BigDecimal pricePerDay;

    @Column(nullable = false)
    private boolean available;

    @Column
    private String imageUrl;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private List<Booking> bookings;
}