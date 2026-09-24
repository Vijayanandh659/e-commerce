import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data))
  }, [id])

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    try {
      await addToCart(product.id, quantity)
      setMessage('Added to cart!')
      setTimeout(() => setMessage(''), 2000)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not add to cart')
    }
  }

  if (!product) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="container product-detail">
      <img src={product.imageUrl} alt={product.name} className="detail-image" />
      <div className="detail-info">
        <h2>{product.name}</h2>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <p className="stock">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>

        {product.stock > 0 && (
          <div className="add-to-cart-row">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        )}
        {message && <p className="success">{message}</p>}
      </div>
    </div>
  )
}
