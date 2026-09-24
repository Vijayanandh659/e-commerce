package com.ecommerce.dto;

public record ProductSummaryResponse(
        Long id,
        String name,
        String imageUrl
) {}
