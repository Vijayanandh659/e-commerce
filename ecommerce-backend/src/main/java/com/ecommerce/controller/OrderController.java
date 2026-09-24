package com.ecommerce.controller;

import com.ecommerce.dto.CheckoutRequest;
import com.ecommerce.dto.OrderResponse;
import com.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(Authentication authentication, @Valid @RequestBody CheckoutRequest request) {
        return ResponseEntity.ok(orderService.checkout(authentication.getName(), request));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getMyOrders(Authentication authentication) {
        return ResponseEntity.ok(orderService.getOrdersForUser(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(Authentication authentication, @PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(authentication.getName(), id));
    }
}
