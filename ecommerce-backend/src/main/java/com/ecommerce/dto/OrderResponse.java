package com.ecommerce.dto;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id,
        Double totalAmount,
        String status,
        String shippingAddress,
        LocalDateTime createdAt,
        List<OrderItemResponse> items
) {}
