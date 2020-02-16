import React from 'react';
import './App.css';
import Board from './components/Board/Index';
import HighScore from './components/HighScore/Index';

function App() {

  return (
    <>
      <div className="game">
        <HighScore/>
        <Board/>
      </div>
    </>
  );
}

export default App;