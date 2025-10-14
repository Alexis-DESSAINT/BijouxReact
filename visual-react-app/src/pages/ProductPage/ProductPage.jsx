import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductVariants from '../../components/ProductVariants/ProductVariants';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5105/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Produit introuvable');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setSelectedVariant(0);
        setCurrentImageIndex(0);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return null;

  const currentVariant = product.variantes[selectedVariant];

  const handleAddToCart = () => {
    alert(`Ajouté au panier: ${quantity}x ${product.nom} - ${currentVariant.nom}`);
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-main">
          {/* Images du produit */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={
                  currentVariant.imageUrl
                    ? `http://localhost:5105${currentVariant.imageUrl}`
                    : 'https://via.placeholder.com/600'
                }
                alt={product.nom}
              />
            </div>
          </div>
          <div className="image-thumbnails">
            {currentVariant.images?.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5105${image}`}
                alt={`${product.nom} vue ${index + 1}`}
                className={currentImageIndex === index ? 'active' : ''}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
          {/* Informations du produit */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.nom}</h1>
              <p className="product-brand">{product.marque}</p>
              <div className="product-price">
                {currentVariant.prix}€
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Sélecteur de variantes */}
            <ProductVariants
              variants={product.variantes}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />

            {/* Spécifications */}
            <div className="product-specs">
              <h3>Spécifications</h3>
              <ul>
                {currentVariant.specifications &&
                  Object.entries(currentVariant.specifications).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Quantité et ajout au panier */}
            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantité:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentVariant.stock, quantity + 1))}
                    disabled={quantity >= currentVariant.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="btn btn-primary add-to-cart"
                  onClick={handleAddToCart}
                  disabled={currentVariant.stock === 0}
                >
                  {currentVariant.stock > 0 ? 'Ajouter au Panier' : 'Rupture de Stock'}
                </button>
                <button className="btn btn-outline">
                  ♡ Ajouter aux Favoris
                </button>
              </div>

              <div className="stock-info">
                {currentVariant.stock > 0 ? (
                  <span className="in-stock">✓ En stock ({currentVariant.stock} disponibles)</span>
                ) : (
                  <span className="out-of-stock">✗ Rupture de stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Tu pourras ajouter ici la logique pour les produits similaires */}
      </div>
    </div>
  );
};

export default ProductPage;