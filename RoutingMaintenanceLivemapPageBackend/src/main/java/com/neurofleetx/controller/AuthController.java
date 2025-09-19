package com.neurofleetx.controller;

import com.neurofleetx.model.User;
import com.neurofleetx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isPresent() && userService.authenticate(email, password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("user", user.get());
            response.put("token", "jwt-token-placeholder"); // In a real app, generate JWT
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(401).body("Invalid email or password");
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.getUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        
        User createdUser = userService.createUser(user);
        Map<String, Object> response = new HashMap<>();
        response.put("user", createdUser);
        response.put("token", "jwt-token-placeholder"); // In a real app, generate JWT
        return ResponseEntity.ok(response);
    }
}