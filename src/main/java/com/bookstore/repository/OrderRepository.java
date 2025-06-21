package com.bookstore.repository;

import com.bookstore.model.Order;
import com.bookstore.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByUser(User user, Pageable pageable);
    Page<Order> findByStatus(Order.OrderStatus status, Pageable pageable);
}
