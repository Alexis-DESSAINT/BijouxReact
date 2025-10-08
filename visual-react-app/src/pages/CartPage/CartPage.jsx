import React, { useState } from 'react';
import './CartPage.css';

const initialCart = [
  {
    id: 1,
    name: "Bague Éternité Diamant",
    variant: "Or Blanc 18k",
    price: 2499,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100"
  },
  {
    id: 2,
    name: "Bracelet Or Rose",
    variant: "Taille S",
    price: 899,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=100"
  }
];

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const handleQuantity = (id, delta) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = id => {
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