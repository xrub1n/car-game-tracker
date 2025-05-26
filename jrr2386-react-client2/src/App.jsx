import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  
  const addPoints = (player, points) => {
    if (player === 1) setPlayer1(prev => prev + points);
    else setPlayer2(prev => prev + points);
  };

  const resetScores = () => {
    setPlayer1(0);
    setPlayer2(0);
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BACKEND_URL}/scores`)
      .then(res => res.json())
      .then(data => {
        setPlayer1(data.player1 || 0);
        setPlayer2(data.player2 || 0);
      });
  }, []);

  const sendScores = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/scores`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player1, player2 }),
      });

      if (!response.ok) throw new Error('Failed to send scores');
      alert('Scores synced!');
    } catch (error) {
      console.error('Error sending scores:', error);
      alert('Failed to sync scores.');
    }
  };



  return (
    <div className="app">
      <h1>Car Game Score Tracker</h1>
      <div className="scoreboard">
        <div className="player">
          <h2>Rubin</h2>
          <p className="score">{player1}</p>
          <button onClick={() => addPoints(1, 3)}>Cheesy Squeezy (+3)</button>
          <button onClick={() => addPoints(1, 4)}>Punch Buggy (+4)</button>
          <button onClick={() => addPoints(1, 1)}>Duck Duck Goose (+1)</button>
          <button onClick={() => addPoints(1, 1)}>Jeep Jeep (+1)</button>
        </div>
        <div className="player">
          <h2>Bug</h2>
          <p className="score">{player2}</p>
          <button onClick={() => addPoints(2, 3)}>Cheesy Squeezy (+3)</button>
          <button onClick={() => addPoints(2, 4)}>Punch Buggy (+4)</button>
          <button onClick={() => addPoints(2, 1)}>Duck Duck Goose (+1)</button>
          <button onClick={() => addPoints(2, 1)}>Jeep Jeep (+1)</button>
        </div>
      </div>
      <button className="send-button" onClick={sendScores}>Send Scores</button>
      <button className="reset-button" onClick={resetScores}>Reset Scores</button>
    </div>
  );
}

export default App;
