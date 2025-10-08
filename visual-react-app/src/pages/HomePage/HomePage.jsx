import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Bague Éternité Diamant",
      price: 2499,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
      category: "Bagues"
    },
    {
      id: 2,
      name: "Collier Perles Tahiti",
      price: 1899,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      category: "Colliers"
    },
    {
      id: 3,
      name: "Bracelet Or Rose",
      price: 899,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400",
      category: "Bracelets"
    }
  ];

  const categories = [
    {
      name: "Bagues",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300",
      count: 45
    },
    {
      name: "Colliers",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300",
      count: 32
    },
    {
      name: "Bracelets",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300",
      count: 28
    },
    {
      name: "Boucles d'oreilles",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300",
      count: 38
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Créations Artisanales
            <span className="hero-subtitle">d'Exception</span>
          </h1>
          <p className="hero-description">
            Découvrez notre collection de bijoux uniques, conçus avec passion et savoir-faire traditionnel
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Découvrir la Collection
            </Link>
            <Link to="/articles" className="btn btn-outline">
              Notre Histoire
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600" 
            alt="Bijoux d'exception"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Nos Catégories</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/products?category=${category.name}`}
                className="category-card"
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay">
                    <h3>{category.name}</h3>
                    <p>{category.count} produits</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="container">
          <h2 className="section-title">Produits Vedettes</h2>
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <Link to={`/product/${product.id}`} className="btn btn-primary">
                      Voir Détails
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">{product.price}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>L'Art de la Bijouterie</h2>
              <p>
                Depuis plus de 30 ans, nous perpétuons la tradition artisanale française 
                en créant des bijoux d'exception. Chaque pièce est unique et reflète 
                notre passion pour l'excellence.
              </p>
              <ul className="about-features">
                <li>✨ Créations artisanales uniques</li>
                <li>💎 Matériaux nobles et certifiés</li>
                <li>🏆 Savoir-faire traditionnel</li>
                <li>🚚 Livraison gratuite en France</li>
              </ul>
              <Link to="/articles" className="btn btn-accent">
                Découvrir Notre Histoire
              </Link>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500" 
                alt="Atelier de bijouterie"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;