import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

// Données fictives - 15 produits par catégorie
const productsData = {
  'Bagues': [
    { id: 1, name: "Bague Éternité Diamant", price: 2499, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400" },
    { id: 2, name: "Bague Solitaire Classique", price: 1899, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400" },
    { id: 3, name: "Alliance Or Blanc", price: 899, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 4, name: "Bague Vintage Art Déco", price: 1299, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 5, name: "Bague Cocktail Émeraude", price: 3200, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400" },
    { id: 6, name: "Alliance Diamants", price: 1499, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400" },
    { id: 7, name: "Bague Marquise", price: 2100, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 8, name: "Bague Triple Anneaux", price: 799, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 9, name: "Bague Princesse", price: 1699, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400" },
    { id: 10, name: "Alliance Confort", price: 649, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400" },
    { id: 11, name: "Bague Toi et Moi", price: 2799, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 12, name: "Bague Fleur Diamants", price: 1899, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 13, name: "Alliance Gravée", price: 749, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400" },
    { id: 14, name: "Bague Papillon", price: 1299, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400" },
    { id: 15, name: "Bague Infinity", price: 999, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" }
  ],
  'Colliers': [
    { id: 16, name: "Collier Perles Tahiti", price: 1899, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
    { id: 17, name: "Pendentif Coeur Diamant", price: 1299, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
    { id: 18, name: "Chaîne Or Jaune", price: 699, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
    { id: 19, name: "Collier Rivière", price: 3499, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
    { id: 20, name: "Pendentif Croix", price: 899, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
    { id: 21, name: "Collier Perles Akoya", price: 2199, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
    { id: 22, name: "Pendentif Étoile", price: 749, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
    { id: 23, name: "Collier Choker", price: 599, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
    { id: 24, name: "Pendentif Soleil", price: 1099, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
    { id: 25, name: "Collier Multi-rangs", price: 1699, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
    { id: 26, name: "Pendentif Papillon", price: 849, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
    { id: 27, name: "Collier Tennis", price: 2899, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
    { id: 28, name: "Pendentif Lune", price: 699, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
    { id: 29, name: "Collier Sautoir", price: 1299, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
    { id: 30, name: "Pendentif Infini", price: 799, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" }
  ],
  'Bracelets': [
    { id: 31, name: "Bracelet Or Rose", price: 899, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 32, name: "Bracelet Tennis", price: 2199, image: "https://images.unsplash.com/photo-1594736797933-d0f1dd3979cc?w=400" },
    { id: 33, name: "Bracelet Perles", price: 699, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 34, name: "Bracelet Chaîne", price: 499, image: "https://images.unsplash.com/photo-1594736797933-d0f1dd3979cc?w=400" },
    { id: 35, name: "Bracelet Jonc", price: 799, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 36, name: "Bracelet Charm", price: 1299, image: "https://images.unsplash.com/photo-1594736797933-d0f1dd3979cc?w=400" },
    { id: 37, name: "Bracelet Manchette", price: 1599, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 38, name: "Bracelet Rivière", price: 2799, image: "https://images.unsplash.com/photo-1594736797933-d0f1dd3979cc?w=400" },
    { id: 39, name: "Bracelet Cuir", price: 299, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 40, name: "Bracelet Tressé", price: 599, image: "https://images.unsplash.com/photo-1594736797933-d0f1dd3979cc?w=400" },
    { id: 41, name: "Bracelet Gourmette", price: 899, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 42, name: "Bracelet Cordon", price: 199, image: "https://images.unsplash.com/photo-1594736797933-d0f1dd3979cc?w=400" },
    { id: 43, name: "Bracelet Diamants", price: 1899, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
    { id: 44, name: "Bracelet Vintage", price: 1099, image: "https://images.unsplash.com/photo-1594736797933-d0f1dd3979cc?w=400" },
    { id: 45, name: "Bracelet Multi-tours", price: 749, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" }
  ],
  'Boucles d\'oreilles': [
    { id: 46, name: "Puces Diamant", price: 999, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 47, name: "Créoles Or", price: 699, image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400" },
    { id: 48, name: "Pendants Perles", price: 1299, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 49, name: "Boucles Chandelier", price: 1899, image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400" },
    { id: 50, name: "Puces Étoile", price: 499, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 51, name: "Créoles Pavées", price: 1599, image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400" },
    { id: 52, name: "Pendants Goutte", price: 899, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 53, name: "Boucles Vintage", price: 1199, image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400" },
    { id: 54, name: "Puces Coeur", price: 599, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 55, name: "Créoles Torsadées", price: 799, image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400" },
    { id: 56, name: "Pendants Plume", price: 749, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 57, name: "Boucles Asymétriques", price: 899, image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400" },
    { id: 58, name: "Puces Papillon", price: 649, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { id: 59, name: "Créoles Granulées", price: 999, image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400" },
    { id: 60, name: "Pendants Cristal", price: 1099, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" }
  ],
  'Montres': [
    { id: 61, name: "Montre Classique Or", price: 2999, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400" },
    { id: 62, name: "Montre Sport Steel", price: 1599, image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400" },
    { id: 63, name: "Montre Vintage Cuir", price: 1299, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400" },
    { id: 64, name: "Montre Diamants", price: 4999, image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400" },
    { id: 65, name: "Montre Minimaliste", price: 899, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400" },
    { id: 66, name: "Montre Chronographe", price: 2199, image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400" },
    { id: 67, name: "Montre Squelette", price: 3499, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400" },
    { id: 68, name: "Montre Bracelet Mesh", price: 1799, image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400" },
    { id: 69, name: "Montre GMT", price: 2699, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400" },
    { id: 70, name: "Montre Dress Code", price: 1999, image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400" },
    { id: 71, name: "Montre Diver", price: 2299, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400" },
    { id: 72, name: "Montre Automatique", price: 3299, image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400" },
    { id: 73, name: "Montre Connectée", price: 599, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400" },
    { id: 74, name: "Montre Rétro", price: 1499, image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400" },
    { id: 75, name: "Montre Elegance", price: 2499, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400" }
  ]
};

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [filterPrice, setFilterPrice] = useState('all');

  const category = searchParams.get('category') || 'Bagues';

  useEffect(() => {
    setProducts(productsData[category] || []);
  }, [category]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      default: return a.name.localeCompare(b.name);
    }
  });

  const filteredProducts = sortedProducts.filter(product => {
    switch (filterPrice) {
      case 'under-1000': return product.price < 1000;
      case '1000-2000': return product.price >= 1000 && product.price <= 2000;
      case 'over-2000': return product.price > 2000;
      default: return true;
    }
  });

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
              <option value="under-1000">Moins de 1000€</option>
              <option value="1000-2000">1000€ - 2000€</option>
              <option value="over-2000">Plus de 2000€</option>
            </select>
          </div>

          <div className="results-count">
            {filteredProducts.length} produits
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} onClick={() => window.scrollTo(0, 0)} className="product-link">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <span className="view-product">Voir le produit</span>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}€</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;