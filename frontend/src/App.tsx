import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VotingView from './components/VotingView';
import VoteResults from './components/VoteResults';
import QRCodeView from './components/QRCodeView';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<VotingView />} />
          <Route path="/results" element={<VoteResults />} />
          <Route path="/code" element={<QRCodeView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
