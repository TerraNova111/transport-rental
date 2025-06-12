package com.example.transportrental.controllers;

import com.example.transportrental.dto.ContactFormDTO;
import com.example.transportrental.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<String> sendContactMessage(@RequestBody ContactFormDTO form) {
        emailService.sendContactEmail(form.getName(), form.getEmail(), form.getMessage());
        return ResponseEntity.ok("Сообщение отправлено");
    }


}
