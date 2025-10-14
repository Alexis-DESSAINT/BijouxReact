import React, { useEffect, useState } from 'react';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5105/api/cart')
      .then(res => res.json())
      .then(data => {
        // On adapte les données API au format attendu par le visuel existant
        const items = (data.items || []).map(item => ({
          id: item.id,
          name: item.variante.articleNom,
          variant: item.variante.nom,
          price: item.variante.prix,
          quantity: item.quantite,
          image: item.variante.imageUrl
            ? `http://localhost:5105${item.variante.imageUrl}`
            : 'https://via.placeholder.com/100'
        }));
        setCart(items);
      });
  }, []);

  const handleQuantity = (id, delta) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
    // TODO: Appeler l'API pour mettre à jour la quantité côté serveur si besoin
  };

  const handleRemove = async id => {
    await fetch(`http://localhost:5105/api/cart/remove/${id}`, { method: 'DELETE' });
    setCart(cart => cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page container">
      <h1 className="section-title">Votre Panier</h1>
      {cart.length === 0 ? (
        <div className="cart-empty">
          Votre panier est vide.
        </div>
      ) : (
        <div className="cart-list">
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p className="cart-variant">{item.variant}</p>
                <div className="cart-qty">
                  <button onClick={() => handleQuantity(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <div className="cart-item-price">
                {item.price * item.quantity}€
              </div>
              <button className="cart-remove" onClick={() => handleRemove(item.id)}>✕</button>
            </div>
          ))}
          <div className="cart-summary">
            <div>Total :</div>
            <div className="cart-total">{total}€</div>
          </div>
          <button className="btn btn-primary cart-checkout" onClick={() => alert('Commande validée !')}>
            Valider la commande
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;