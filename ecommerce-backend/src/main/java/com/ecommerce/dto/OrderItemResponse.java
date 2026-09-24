package com.ecommerce.dto;

public record OrderItemResponse(
        Long id,
        ProductSummaryResponse product,
        Integer quantity,
        Double price
) {}
