package com.ecommerce.service;

import com.ecommerce.dto.CheckoutRequest;
import com.ecommerce.dto.OrderItemResponse;
import com.ecommerce.dto.OrderResponse;
import com.ecommerce.dto.ProductSummaryResponse;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.*;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrderResponse checkout(String userEmail, CheckoutRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<CartItem> cartItems = cartItemRepository.findByUserId(user.getId());

        if (cartItems.isEmpty()) {
            throw new BadRequestException("Your cart is empty");
        }

        // Validate stock for every item before committing
        for (CartItem ci : cartItems) {
            if (ci.getQuantity() > ci.getProduct().getStock()) {
                throw new BadRequestException("Not enough stock for " + ci.getProduct().getName());
            }
        }

        double total = cartItems.stream()
                .mapToDouble(ci -> ci.getProduct().getPrice() * ci.getQuantity())
                .sum();

        Order order = Order.builder()
                .user(user)
                .totalAmount(total)
                .status("PLACED")
                .shippingAddress(request.getShippingAddress())
                .build();

        List<OrderItem> orderItems = cartItems.stream()
                .map(ci -> OrderItem.builder()
                        .order(order)
                        .product(ci.getProduct())
                        .quantity(ci.getQuantity())
                        .price(ci.getProduct().getPrice())
                        .build())
                .collect(Collectors.toList());

        order.setItems(orderItems);

        // Deduct stock
        for (CartItem ci : cartItems) {
            Product product = ci.getProduct();
            product.setStock(product.getStock() - ci.getQuantity());
            productRepository.save(product);
        }

        Order saved = orderRepository.save(order);

        // Clear the cart
        cartItemRepository.deleteAll(cartItems);

        return toResponse(orderRepository.findById(saved.getId()).orElse(saved));
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(String userEmail, Long orderId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId()) && !user.getRole().equals("ADMIN")) {
            throw new BadRequestException("This order does not belong to you");
        }

        return toResponse(order);
    }

    private OrderResponse toResponse(Order order) {
        List<OrderItemResponse> items = order.getItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getId(), new ProductSummaryResponse(
                                item.getProduct().getId(), item.getProduct().getName(), item.getProduct().getImageUrl()
                        ), item.getQuantity(), item.getPrice()
                ))
                .toList();
        return new OrderResponse(order.getId(), order.getTotalAmount(), order.getStatus(),
                order.getShippingAddress(), order.getCreatedAt(), items);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
