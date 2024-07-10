// src/components/Image.jsx
import React from 'react';
import './Image.css';

const Image = ({ url }) => {
  return <img src={url} alt="Superhero" />;
};

export default Image;
