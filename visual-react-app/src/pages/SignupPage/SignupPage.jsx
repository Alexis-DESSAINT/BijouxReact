import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [msg, setMsg] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwd2Error, setPwd2Error] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPwdError('');
    setPwd2Error('');
    setApiError('');
    setMsg('');

    if (!validatePassword(password)) {
      setPwdError("Le mot de passe doit respecter les conditions ci-dessous.");
      return;
    }
    if (password !== password2) {
      setPwd2Error("Les mots de passe ne correspondent pas.");
      return;
    }

    // Appel API
    try {
      const response = await fetch('http://localhost:5105/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          nom,
          prenom,
          adresse,
          ville,
          codePostal,
          telephone,
          password
        })
      });

      if (!response.ok) {
        const error = await response.text();
        setApiError(error || "Erreur lors de la création du compte.");
        return;
      }

      setMsg("Votre compte a bien été créé !");
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setApiError("Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="signup-page container">
      <div className="signup-card">
        <h1>Créer un compte</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Prénom
            <input
              type="text"
              placeholder="Votre prénom"
              value={prenom}
              onChange={e => setPrenom(e.target.value)}
              required
            />
          </label>
          <label>
            Nom
            <input
              type="text"
              placeholder="Votre nom"
              value={nom}
              onChange={e => setNom(e.target.value)}
              required
            />
          </label>
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
            Adresse
            <input
              type="text"
              placeholder="Votre adresse"
              value={adresse}
              onChange={e => setAdresse(e.target.value)}
              required
            />
          </label>
          <label>
            Ville
            <input
              type="text"
              placeholder="Votre ville"
              value={ville}
              onChange={e => setVille(e.target.value)}
              required
            />
          </label>
          <label>
            Code postal
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              placeholder="Code postal"
              value={codePostal}
              onChange={e => setCodePostal(e.target.value.replace(/\D/g, ''))}
              required
            />
          </label>
          <label>
            Téléphone
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={15}
              placeholder="Numéro de téléphone"
              value={telephone}
              onChange={e => setTelephone(e.target.value.replace(/\D/g, ''))}
              required
            />
          </label>
          <label>
            Mot de passe
            <div className="signup-password-field">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Votre mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="signup-showpwd-btn"
                onClick={() => setShowPwd(v => !v)}
                tabIndex={-1}
                aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
            <ul className="signup-password-rules">
              <li>Au moins 7 caractères</li>
              <li>Au moins 1 majuscule</li>
              <li>Au moins 1 chiffre</li>
              <li>Au moins 1 caractère spécial</li>
            </ul>
            {pwdError && <div className="signup-error">{pwdError}</div>}
          </label>
          <label>
            Confirmer le mot de passe
            <div className="signup-password-field">
              <input
                type={showPwd2 ? "text" : "password"}
                placeholder="Répétez le mot de passe"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="signup-showpwd-btn"
                onClick={() => setShowPwd2(v => !v)}
                tabIndex={-1}
                aria-label={showPwd2 ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPwd2 ? "🙈" : "👁️"}
              </button>
            </div>
            {pwd2Error && <div className="signup-error">{pwd2Error}</div>}
          </label>
          <button className="btn btn-primary" type="submit">
            Créer mon compte
          </button>
        </form>
        {pwdError && <div className="signup-error">{pwdError}</div>}
        {pwd2Error && <div className="signup-error">{pwd2Error}</div>}
        {apiError && <div className="signup-error">{apiError}</div>}
        {msg && <div className="signup-msg">{msg}</div>}
        <div className="signup-help">
          <span>Déjà inscrit ? </span>
          <a href="/login">Se connecter</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;