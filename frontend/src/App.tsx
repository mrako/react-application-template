import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VotingView from './components/VotingView';
import VoteResults from './components/VoteResults';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<VotingView />} />
          <Route path="/results" element={<VoteResults />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
