package com.example.transportrental.model;

import com.example.transportrental.model.enums.ServiceCategory;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

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

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private String category;

    @Enumerated(EnumType.STRING)
    private ServiceCategory serviceCategory;

    @Column
    private Integer quantity;

    @Column(nullable = true)
    private BigDecimal pricePerDay;

    @Column(nullable = true)
    private BigDecimal ratePerKm;

    @Column(nullable = false)
    private boolean available;

    @Column
    private String imageUrl;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "description_detailed", columnDefinition = "jsonb")
    private Map<String, Object> descriptionDetailed;
}