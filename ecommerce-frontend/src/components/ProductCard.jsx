import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-image-wrap">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          {product.stock > 0 && <span className="product-tag">In stock</span>}
        </div>
        <h3>{product.name}</h3>
      </Link>
      <div className="product-card-meta">
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="stock">{product.stock > 0 ? `${product.stock} available` : 'Sold out'}</p>
      </div>
      <Link to={`/products/${product.id}`} className="btn btn-secondary">View Details</Link>
    </div>
  )
}
