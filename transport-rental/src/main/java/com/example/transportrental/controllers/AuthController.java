package com.example.transportrental.controllers;

import com.example.transportrental.dto.auth.AuthRequestDTO;
import com.example.transportrental.dto.auth.AuthResponseDTO;
import com.example.transportrental.dto.auth.RegisterRequestDTO;
import com.example.transportrental.dto.auth.ResetPasswordRequestDTO;
import com.example.transportrental.model.User;
import com.example.transportrental.repository.UserRepository;
import com.example.transportrental.security.JwtUtil;
import com.example.transportrental.services.AuthService;
import com.example.transportrental.services.EmailService;
import com.example.transportrental.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;


    @PostMapping("/register")
    public AuthResponseDTO register(@RequestBody RegisterRequestDTO request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody AuthRequestDTO request) {
        return authService.login(request);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing token");
        }

        String token = authHeader.substring(7);

        if (authService.validateToken(token)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.ok("Если email зарегистрирован — будет отправлена ссылка для сброса");
        }

        User user = userOpt.get();
        String resetToken = UUID.randomUUID().toString();

        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        emailService.sendPasswordResetEmail(email, resetToken);

        return ResponseEntity.ok("Ссылка для сброса пароля отправлена на почту");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequestDTO request) {
        Optional<User> userOpt = userRepository.findByResetToken(request.getToken());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Неверный токен");
        }

        User user = userOpt.get();

        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Токен истёк");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);

        userRepository.save(user);

        return ResponseEntity.ok("Пароль успешно сброшен");
    }
}
