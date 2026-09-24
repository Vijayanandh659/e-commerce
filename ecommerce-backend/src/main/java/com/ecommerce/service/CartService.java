package com.ecommerce.service;

import com.ecommerce.dto.CartItemRequest;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<CartItem> getCart(String userEmail) {
        User user = getUser(userEmail);
        return cartItemRepository.findByUserId(user.getId());
    }

    public CartItem addToCart(String userEmail, CartItemRequest request) {
        User user = getUser(userEmail);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + request.getProductId()));

        if (request.getQuantity() > product.getStock()) {
            throw new BadRequestException("Only " + product.getStock() + " units of " + product.getName() + " available");
        }

        CartItem existing = cartItemRepository.findByUserIdAndProductId(user.getId(), product.getId()).orElse(null);

        if (existing != null) {
            int newQuantity = existing.getQuantity() + request.getQuantity();
            if (newQuantity > product.getStock()) {
                throw new BadRequestException("Only " + product.getStock() + " units of " + product.getName() + " available");
            }
            existing.setQuantity(newQuantity);
            return cartItemRepository.save(existing);
        }

        CartItem item = CartItem.builder()
                .user(user)
                .product(product)
                .quantity(request.getQuantity())
                .build();

        return cartItemRepository.save(item);
    }

    public CartItem updateQuantity(String userEmail, Long cartItemId, Integer quantity) {
        User user = getUser(userEmail);
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (!item.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("This cart item does not belong to you");
        }

        if (quantity == null || quantity < 1) {
            cartItemRepository.delete(item);
            return item;
        }

        if (quantity > item.getProduct().getStock()) {
            throw new BadRequestException("Only " + item.getProduct().getStock() + " units available");
        }

        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    public void removeFromCart(String userEmail, Long cartItemId) {
        User user = getUser(userEmail);
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (!item.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("This cart item does not belong to you");
        }

        cartItemRepository.delete(item);
    }

    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
