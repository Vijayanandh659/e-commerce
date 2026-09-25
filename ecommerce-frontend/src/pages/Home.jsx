import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    setError('')
    const params = {}
    if (selectedCategory) params.categoryId = selectedCategory
    if (search) params.search = search

    api.get('/products', { params })
      .then((res) => setProducts(res.data))
      .catch(() => setError('Failed to load products. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [selectedCategory, search])

  return (
    <div className="container">
      <section className="hero">
        <div>
          <p className="eyebrow">A little joy, thoughtfully picked</p>
          <h1>Find your<br /><em>happy place.</em></h1>
          <p className="hero-copy">Discover feel-good favorites for everyday living, thoughtful gifting, and everything in between.</p>
        </div>
      </section>
      <div className="shop-heading">
        <div><p className="eyebrow">The collection</p><h2>Find your next favorite</h2></div>
        <span>Fresh picks, just for you</span>
      </div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {!loading && !error && products.length === 0 && <p>No products found.</p>}
    </div>
  )
}
