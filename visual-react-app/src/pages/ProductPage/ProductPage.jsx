import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductVariants from '../../components/ProductVariants/ProductVariants';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Données fictives pour le produit
  const product = {
    id: 1,
    name: "Bague Éternité Diamant",
    description: "Une magnifique bague éternité ornée de diamants sertis sur tout le tour. Cette pièce exceptionnelle symbolise l'amour éternel et l'engagement. Confectionnée avec les plus beaux diamants et un savoir-faire artisanal d'exception.",
    basePrice: 2499,
    category: "Bagues",
    brand: "Création Bijoux Shop",
    variants: [
      {
        id: 1,
        name: "Or Blanc 18k",
        price: 2499,
        stock: 5,
        images: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600"
        ],
        specifications: {
          metal: "Or Blanc 18k",
          stones: "Diamants 0.5ct",
          size: "Taille 54"
        }
      },
      {
        id: 2,
        name: "Or Jaune 18k",
        price: 2399,
        stock: 3,
        images: [
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600"
        ],
        specifications: {
          metal: "Or Jaune 18k",
          stones: "Diamants 0.5ct",
          size: "Taille 54"
        }
      },
      {
        id: 3,
        name: "Or Rose 18k",
        price: 2599,
        stock: 2,
        images: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600"
        ],
        specifications: {
          metal: "Or Rose 18k",
          stones: "Diamants 0.5ct",
          size: "Taille 54"
        }
      }
    ]
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Bague Solitaire",
      price: 1899,
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300"
    },
    {
      id: 3,
      name: "Alliance Classique",
      price: 899,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300"
    },
    {
      id: 4,
      name: "Bague Vintage",
      price: 1299,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300"
    }
  ];

  const currentVariant = product.variants[selectedVariant];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    alert(`Ajouté au panier: ${quantity}x ${product.name} - ${currentVariant.name}`);
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-main">
          {/* Images du produit */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={currentVariant.images[currentImageIndex]} 
                alt={product.name}
              />
            </div>
            <div className="image-thumbnails">
              {currentVariant.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} vue ${index + 1}`}
                  className={currentImageIndex === index ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Informations du produit */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <p className="product-brand">{product.brand}</p>
              <div className="product-price">
                {currentVariant.price}€
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Sélecteur de variantes */}
            <ProductVariants
              variants={product.variants}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />

            {/* Spécifications */}
            <div className="product-specs">
              <h3>Spécifications</h3>
              <ul>
                {Object.entries(currentVariant.specifications).map(([key, value]) => (
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

        {/* Produits similaires */}
        <section className="related-products">
          <h2>Produits Similaires</h2>
          <div className="related-grid">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="related-product-card">
                <img src={relatedProduct.image} alt={relatedProduct.name} />
                <div className="related-product-info">
                  <h3>{relatedProduct.name}</h3>
                  <p className="related-product-price">{relatedProduct.price}€</p>
                  <button className="btn btn-outline btn-sm">Voir</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;