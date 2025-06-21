package com.bookstore.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderDto {
    @NotEmpty(message = "Order items cannot be empty")
    private List<OrderItemDto> orderItems;
}
