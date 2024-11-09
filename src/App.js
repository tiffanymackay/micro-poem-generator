import React from 'react';
import PoemGenerator from './components/PoemGenerator.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Micro Poem Generator</h1>
        <p>Generate a poem with AI in seconds</p>
      </header>
      
      <PoemGenerator />
      
      <small>
        This website is designed and coded by UX Web and Brand Designer{' '}
        <a href="https://www.linkedin.com/in/tiffanylmackay/" target="_blank" rel="noopener noreferrer">
          Tiffany Mackay
        </a>
        , and is{' '}
        <a href="https://github.com/tiffanymackay/Croissant" target="_blank" rel="noopener noreferrer">
          open-sourced
        </a>
        .<br />© 2024 Tiffany Mackay
      </small>
    </div>
  );
}

export default App; 