import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { cartItems, cartTotal, fetchCart } = useCart()
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [placing, setPlacing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setError('')
    setPlacing(true)
    try {
      const { data } = await api.post('/orders/checkout', { shippingAddress: address })
      await fetchCart()
      navigate(`/orders`, { state: { justPlacedOrderId: data.id } })
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed')
    } finally {
      setPlacing(false)
    }
  }

  if (cartItems.length === 0) {
    return <div className="container"><p>Your cart is empty.</p></div>
  }

  return (
    <div className="container">
      <h2>Checkout</h2>

      <div className="order-review">
        {cartItems.map((item) => (
          <div key={item.id} className="order-review-row">
            <span>{item.product?.name} x {item.quantity}</span>
            <span>${(Number(item.product?.price || 0) * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="order-review-row total">
          <strong>Total</strong>
          <strong>${cartTotal.toFixed(2)}</strong>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="form">
        <label>Shipping Address</label>
        <textarea
          required
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, City, State, ZIP"
        />
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={placing}>
          {placing ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}
