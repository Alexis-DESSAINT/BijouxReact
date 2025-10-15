import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    'Bagues',
    'Colliers',
    'Bracelets',
    'Boucles d\'oreilles',
    'Montres'
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            Bijoux Shop
          </Link>

          <div className="navbar-center">
            <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
              <li><Link to="/" onClick={() => window.scrollTo(0, 0)}>Accueil</Link></li>
              <li className="dropdown">
                <Link to="/products?category=Bagues">Produits</Link>
                <div className="dropdown-content">
                  {categories.map((category, index) => (
                    <Link key={index} to={`/products?category=${category}`}>
                      {category}
                    </Link>
                  ))}
                </div>
              </li>
              <li><Link to="/articles">Articles</Link></li>
            </ul>
          </div>

          <div className="navbar-right">
            <Link to="/cart" onClick={() => window.scrollTo(0, 0)} className="cart-icon">
              🛒
              <span className="cart-badge">{cartCount}</span>
            </Link>
            <Link to="/login" onClick={() => window.scrollTo(0, 0)} className="btn btn-outline">
              Connexion
            </Link>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;