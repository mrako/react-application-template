import React from 'react';
import VotesList from './components/VotesList';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Voting App</h1>
        <VotesList />
      </header>
    </div>
  );
}

export default App;
