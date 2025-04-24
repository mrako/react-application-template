import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './VotingView.css';

const ENDPOINT = import.meta.env.VITE_ENDPOINT || 'http://localhost:9000';

const VotingView: React.FC = () => {
  const navigate = useNavigate();

  const handleVote = async (option: string) => {
    try {
      await axios.post(`${ENDPOINT}/api/votes`, { option });
      navigate('/results');
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="voting-container">
      <h2 className="voting-title">We already use Atlassian AI features</h2>
      <div className="voting-buttons">
        <button className="vote-button" onClick={() => handleVote('1')}>Yes</button>
        <button className="vote-button" onClick={() => handleVote('2')}>No</button>
      </div>
    </div>
  );
};

export default VotingView;
