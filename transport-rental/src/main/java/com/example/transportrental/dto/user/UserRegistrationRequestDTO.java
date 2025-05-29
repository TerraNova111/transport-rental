package com.example.transportrental.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationRequestDTO {
    private String email;
    private String fullName;
    private String phone;
    private String address;
    private String password;
}