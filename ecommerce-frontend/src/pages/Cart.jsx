import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, fetchCart, updateQuantity, removeFromCart, cartTotal } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h2>Your Cart</h2>
        <p>Your cart is empty. <Link to="/">Continue shopping</Link></p>
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-row">
            <img src={item.product?.imageUrl} alt={item.product?.name} className="cart-thumb" />
            <div className="cart-row-info">
              <h4>{item.product?.name}</h4>
              <p>${Number(item.product?.price || 0).toFixed(2)} each</p>
            </div>
            <input
              type="number"
              min="1"
              max={item.product?.stock || 1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            />
            <p className="line-total">${(Number(item.product?.price || 0) * item.quantity).toFixed(2)}</p>
            <button className="link-btn danger" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </div>
  )
}
