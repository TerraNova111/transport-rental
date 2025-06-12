package com.example.transportrental.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String name;
    private String phone;
}
