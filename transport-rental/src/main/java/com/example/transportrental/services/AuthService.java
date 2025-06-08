package com.example.transportrental.services;

import com.example.transportrental.security.JwtUtil;
import com.example.transportrental.dto.auth.AuthRequestDTO;
import com.example.transportrental.dto.auth.AuthResponseDTO;
import com.example.transportrental.dto.auth.RegisterRequestDTO;
import com.example.transportrental.model.enums.Role;
import com.example.transportrental.model.User;
import com.example.transportrental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public AuthResponseDTO register(RegisterRequestDTO request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getUsername(), user.getRole());
        return new AuthResponseDTO(token);
    }

    public AuthResponseDTO login(AuthRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getUsername(), user.getRole());
        return new AuthResponseDTO(token);
    }

    public boolean validateToken(String token) {
        try {
            String email = jwtUtil.extractEmail(token);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return jwtUtil.isTokenValid(token, user.getEmail());
        } catch (Exception e) {
            return false;
        }
    }
}
