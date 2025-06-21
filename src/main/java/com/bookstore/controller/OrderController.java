package com.bookstore.controller;

import com.bookstore.dto.CreateOrderDto;
import com.bookstore.dto.OrderDto;
import com.bookstore.model.Order;
import com.bookstore.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Order Management", description = "APIs for managing orders")
@SecurityRequirement(name = "bearerAuth")
public class OrderController {
    
    private final OrderService orderService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all orders", description = "Retrieve a paginated list of all orders (Admin only)")
    public ResponseEntity<Page<OrderDto>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Order> orders = orderService.getAllOrders(pageable);
        Page<OrderDto> orderDtos = orders.map(orderService::convertToDto);
        
        return ResponseEntity.ok(orderDtos);
    }
    
    @GetMapping("/my-orders")
    @Operation(summary = "Get user's orders", description = "Retrieve current user's orders")
    public ResponseEntity<Page<OrderDto>> getUserOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Order> orders = orderService.getUserOrders(pageable);
        Page<OrderDto> orderDtos = orders.map(orderService::convertToDto);
        
        return ResponseEntity.ok(orderDtos);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get order by ID", description = "Retrieve a single order by its ID")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        OrderDto orderDto = orderService.convertToDto(order);
        return ResponseEntity.ok(orderDto);
    }
    
    @PostMapping
    @Operation(summary = "Create a new order", description = "Place a new order")
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody CreateOrderDto createOrderDto) {
        Order order = orderService.createOrder(createOrderDto);
        OrderDto orderDto = orderService.convertToDto(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderDto);
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update order status", description = "Update the status of an order (Admin only)")
    public ResponseEntity<Map<String, Object>> updateOrderStatus(
            @PathVariable Long id, 
            @RequestParam Order.OrderStatus status) {
        
        Order order = orderService.updateOrderStatus(id, status);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Order status updated successfully");
        response.put("orderId", order.getId());
        response.put("status", order.getStatus());
        
        return ResponseEntity.ok(response);
    }
}
