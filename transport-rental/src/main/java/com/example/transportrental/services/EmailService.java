package com.example.transportrental.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactEmail(String name, String email, String message) {
        System.out.println(">>> Отправка письма на почту...");
        System.out.println("Имя: " + name + ", Email: " + email);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("maxmaydem@gmail.com");
        mailMessage.setSubject("Новое сообщение с сайта от " + name);
        mailMessage.setText("Имя: " + name + "\nEmail: " + email + "\nСообщение:\n" + message);

        mailSender.send(mailMessage);
        System.out.println(">>> Письмо отправлено");
    }

    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(toEmail);
        mailMessage.setSubject("Сброс пароля");
        mailMessage.setText("Вы запросили сброс пароля. Перейдите по ссылке:\n\n" + resetLink +
                "\n\nЕсли это были не вы — проигнорируйте это письмо.");

        mailSender.send(mailMessage);
    }
}