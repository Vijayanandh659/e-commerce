import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await api.get('/orders')
        setOrders(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load your orders. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  if (loading) return <div className="container"><p>Loading orders...</p></div>

  if (error) return <div className="container"><h2>My Orders</h2><p className="error">{error}</p></div>

  if (orders.length === 0) {
    return <div className="container"><h2>My Orders</h2><p>You haven't placed any orders yet.</p></div>
  }

  return (
    <div className="container">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-card-header">
            <span>Order #{order.id}</span>
            <span className={`status status-${(order.status || 'placed').toLowerCase()}`}>{order.status}</span>
          </div>
          <p className="order-date">{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</p>
          <p>Shipping to: {order.shippingAddress}</p>
          <ul>
            {(order.items || []).map((item) => (
              <li key={item.id}>
                {item.product?.name} x {item.quantity} — ${(Number(item.price || 0) * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="order-total"><strong>Total: ${Number(order.totalAmount || 0).toFixed(2)}</strong></p>
        </div>
      ))}
    </div>
  )
}
