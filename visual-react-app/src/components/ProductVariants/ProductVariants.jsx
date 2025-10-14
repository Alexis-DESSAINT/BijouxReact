import React from 'react';
import './ProductVariants.css';

function ProductVariants({ variants, selectedVariant, onVariantChange }) {
  if (!Array.isArray(variants) || variants.length === 0) {
    return <div>Aucune variante disponible</div>;
  }

  return (
    <div className="product-variants">
      <h4>Variantes disponibles :</h4>
      <div className="variant-list">
        {variants.map((variant, idx) => (
          <button
            key={variant.id}
            className={selectedVariant === idx ? 'selected' : ''}
            onClick={() => onVariantChange(idx)}
          >
            Variante {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductVariants;