import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './CategoryPage.css';

// Mappe les noms de catégories à leur ID (à adapter selon ta BDD)
const categoryNameToId = {
  'Bagues': 1,
  'Colliers': 4,
  'Bracelets': 3,
  "Boucles d'oreilles": 2,
  'Montres': 5,
  // Ajoute d'autres catégories si besoin
};

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterPrice, setFilterPrice] = useState('all');

  const category = searchParams.get('category') || 'Bagues';
  const categoryId = categoryNameToId[category];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Appel API avec le paramètre categoryId
        const response = await fetch(`http://localhost:5105/api/products?categoryId=${categoryId}`);
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des produits');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  // Filtrage et tri des produits
  const filteredProducts = products
    .filter(product => {
      // Filtre par prix sur la propriété "prix" (première variante)
      switch (filterPrice) {
        case 'under-100': return product.prix < 100;
        case '100-400': return product.prix >= 100 && product.prix <= 400;
        case 'over-400': return product.prix > 400;
        default: return true;
      }
    })

    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.prix - b.prix;
        case 'price-desc': return b.prix - a.prix;
        default: return a.nom.localeCompare(b.nom);
      }
    });

  if (loading) return <div className="loading">Chargement des produits...</div>;
  if (error) return <div className="error">Erreur : {error}</div>;

  return (
    <div className="category-page">
      <div className="container">
        <header className="category-header">
          <h1 className="category-title">{category}</h1>
          <p className="category-description">
            Découvrez notre collection de {category.toLowerCase()} d'exception
          </p>
        </header>

        <div className="category-controls">
          <div className="filters">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Trier par nom</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>

            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tous les prix</option>
              <option value="under-100">Moins de 100€</option>
              <option value="100-400">100€ - 400€</option>
              <option value="over-400">Plus de 400€</option>
            </select>
          </div>

          <div className="results-count">
            {filteredProducts.length} produits
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image">
                  <img
                    src={
                      product.premiereVariante?.imageUrl
                        ? `http://localhost:5105${product.premiereVariante.imageUrl}`
                        : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400'
                    }
                    alt={product.nom}
                  />
                  <div className="product-overlay">
                    <span className="view-product">Voir le produit</span>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.nom}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.prix}€</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>Aucun produit trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;