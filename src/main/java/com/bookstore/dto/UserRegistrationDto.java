package com.bookstore.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import com.bookstore.model.User;

@Data
public class UserRegistrationDto {
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
    
    private User.Role role = User.Role.CUSTOMER;
}
