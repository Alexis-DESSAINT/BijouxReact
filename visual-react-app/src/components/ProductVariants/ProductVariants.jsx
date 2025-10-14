import React from 'react';
import './ProductVariants.css';

function ProductVariants({ variants, selectedVariant, onVariantChange }) {
  if (!Array.isArray(variants) || variants.length === 0) {
    return <div>Aucune variante disponible</div>;
  }

  return (
    <div className="product-variants">
      <h4>Choisissez une variante :</h4>
      <div className="variant-cards">
        {variants.map((variant, idx) => (
          <div
            key={variant.id}
            className={`variant-card${selectedVariant === idx ? ' selected' : ''}`}
            onClick={() => onVariantChange(idx)}
          >
            <div className="variant-card-main">
              <div className="variant-img">
                <img
                  src={
                    variant.imageUrl
                      ? `http://localhost:5105${variant.imageUrl}`
                      : 'https://via.placeholder.com/80'
                  }
                  alt={variant.nom}
                />
              </div>
              <div className="variant-details">
                <div className="variant-name">{variant.nom}</div>
                <div className="variant-price">{variant.prix} €</div>
                {variant.taille && <div className="variant-info">Taille : {variant.taille}</div>}
                {variant.couleur && <div className="variant-info">Couleur : {variant.couleur}</div>}
              </div>
            </div>
            <div className="variant-select-btn">
              {selectedVariant === idx ? '✓ Sélectionnée' : 'Sélectionner'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductVariants;