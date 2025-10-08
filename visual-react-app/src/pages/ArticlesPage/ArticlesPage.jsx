import React from 'react';
import './ArticlesPage.css';

const articles = [
  {
    id: 1,
    title: "L'histoire de la bague éternité",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
    excerpt: "Découvrez l'origine et la symbolique de la bague éternité, un bijou intemporel...",
    content: "La bague éternité est un symbole d'amour sans fin. Créée pour représenter l'infini, elle est souvent offerte lors d'occasions spéciales..."
  },
  {
    id: 2,
    title: "Comment choisir son collier ?",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
    excerpt: "Longueur, matière, style... Nos conseils pour trouver le collier parfait.",
    content: "Le choix d'un collier dépend de la morphologie, du style et de l'occasion. Voici nos astuces pour bien choisir..."
  },
  {
    id: 3,
    title: "L'artisanat français au service du bijou",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
    excerpt: "Plongez dans les coulisses de notre atelier et découvrez notre savoir-faire.",
    content: "Depuis plus de 30 ans, notre atelier perpétue la tradition de la bijouterie française..."
  }
];

const ArticlesPage = () => (
  <div className="articles-page container">
    <h1 className="section-title">Nos Articles</h1>
    <div className="articles-list">
      {articles.map(article => (
        <div className="article-card" key={article.id}>
          <img src={article.image} alt={article.title} className="article-image" />
          <div className="article-content">
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <button className="btn btn-outline" onClick={() => alert(article.content)}>
              Lire l'article
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ArticlesPage;