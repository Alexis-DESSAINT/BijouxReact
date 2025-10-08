import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (email === "test@bijoux.fr" && password === "demo") {
      setMsg("Connexion réussie !");
    } else {
      setMsg("Identifiants incorrects.");
    }
  };

  return (
    <div className="login-page container">
      <div className="login-card">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="votre@email.fr"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Se connecter
          </button>
        </form>
        {msg && <div className="login-msg">{msg}</div>}
        <div className="login-help">
          <a href="#">Mot de passe oublié ?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;