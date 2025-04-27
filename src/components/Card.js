// src/components/Card.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Components.css';

const Card = ({ title, description, serviceId }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/book-program/${serviceId}`)}
      style={{
        backgroundImage: 'url(/images/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="card-overlay">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <button className="card-button">Book Program</button>
      </div>
    </div>
  );
};

export default Card;
