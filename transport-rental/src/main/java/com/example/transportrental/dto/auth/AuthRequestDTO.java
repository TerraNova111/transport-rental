package com.example.transportrental.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthRequestDTO {
    private String email;
    private String password;
}
