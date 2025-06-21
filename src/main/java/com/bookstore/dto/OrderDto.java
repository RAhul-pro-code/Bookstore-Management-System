package com.bookstore.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import com.bookstore.model.Order;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private List<OrderItemDto> orderItems;
    private BigDecimal totalAmount;
    private Order.OrderStatus status;
    private Order.PaymentStatus paymentStatus;
}
