import React, { useEffect, useState } from 'react';
import './CartPage.css';
import ModalAlert from '../../components/ModalAlert/ModalAlert';

const CartPage = ({ onCartChange }) => {
  const [cart, setCart] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // Fonction pour charger le panier et mettre à jour le compteur
  const loadCart = () => {
    fetch('http://localhost:5105/api/cart')
      .then(res => res.json())
      .then(data => {
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
        if (onCartChange) onCartChange(items.reduce((sum, i) => sum + i.quantity, 0));
      });
  };

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line
  }, []);

  const handleQuantity = async (id, delta) => {
    const response = await fetch(`http://localhost:5105/api/cart/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delta })
    });

    if (!response.ok) {
      const error = await response.json();
      setAlertMsg(error.message || "Erreur lors de la modification de la quantité.");
      setAlertOpen(true);
      return;
    }

    loadCart();
  };

  const handleRemove = async id => {
    await fetch(`http://localhost:5105/api/cart/remove/${id}`, { method: 'DELETE' });
    loadCart();
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
            Passer commande
          </button>
        </div>
      )}
      <ModalAlert open={alertOpen} message={alertMsg} onClose={() => setAlertOpen(false)} />
    </div>
  );
};

export default CartPage;