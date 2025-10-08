import React from 'react';
import './ProductVariants.css';

const ProductVariants = ({ variants, selectedVariant, onVariantChange }) => {
  return (
    <div className="product-variants">
      <h3>Choisir une variante</h3>
      <div className="variants-list">
        {variants.map((variant, index) => (
          <div
            key={variant.id}
            className={`variant-option ${selectedVariant === index ? 'selected' : ''} ${variant.stock === 0 ? 'out-of-stock' : ''}`}
            onClick={() => variant.stock > 0 && onVariantChange(index)}
          >
            <div className="variant-preview">
              <img src={variant.images[0]} alt={variant.name} />
            </div>
            <div className="variant-details">
              <h4>{variant.name}</h4>
              <p className="variant-price">{variant.price}€</p>
              <p className="variant-stock">
                {variant.stock > 0 ? `${variant.stock} en stock` : 'Rupture de stock'}
              </p>
            </div>
            {selectedVariant === index && (
              <div className="selected-indicator">✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;