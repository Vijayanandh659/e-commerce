import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const { cartCount, clearLocalCart } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    clearLocalCart()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand"><span className="brand-mark"></span>Vijay Mart's</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/orders">My Orders</Link>}
        <Link to="/cart" className="cart-link">
          <span className="cart-label">Cart</span> {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
        {isAuthenticated ? (
          <>
            <span className="greeting">Hi, {user.name}</span>
            <button className="link-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}
