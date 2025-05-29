package com.example.transportrental.controllers;

import com.example.transportrental.dto.auth.AuthRequestDTO;
import com.example.transportrental.dto.auth.AuthResponseDTO;
import com.example.transportrental.dto.auth.RegisterRequestDTO;
import com.example.transportrental.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponseDTO register(@RequestBody RegisterRequestDTO request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody AuthRequestDTO request) {
        return authService.login(request);
    }
}
