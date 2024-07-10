// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Image from './components/Image';
import Stats from './components/Stats';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [hero, setHero] = useState(null);
  const token = '46be431cdc8154250d6b48e67af5e627';
  const baseUrl = `https://www.superheroapi.com/api.php/${token}`;

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${baseUrl}/search/${name}`);
      console.log(response.data);
      if (response.data.results && response.data.results.length > 0) {
        setHero(response.data.results[0]);
      } else {
        console.error('No superhero found');
      }
    } catch (error) {
      console.error('Error fetching superhero data:', error);
    }
  };

  const handleRandomClick = async () => {
    const randomId = Math.floor(Math.random() * 731) + 1;
    try {
      const response = await axios.get(`${baseUrl}/${randomId}`);
      console.log(response.data);
      setHero(response.data);
    } catch (error) {
      console.error('Error fetching random superhero data:', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleClick}>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter superhero name"
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleRandomClick}>Get Random Superhero</button>
      {hero && (
        <>
          <Image url={hero.image.url} />
          <Stats stats={hero.powerstats} />
        </>
      )}
    </div>
  );
};

export default App;
