package com.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class ProductRequest {
    @NotBlank
    private String name;

    private String description;

    @NotNull @Positive
    private Double price;

    @NotNull @PositiveOrZero
    private Integer stock;

    private String imageUrl;

    @NotNull
    private Long categoryId;
}
