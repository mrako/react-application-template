import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VotingView.css';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:9000';

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
      <h2 className="voting-title">Cast Your Vote</h2>
      <div className="voting-buttons">
        <button className="vote-button" onClick={() => handleVote('1')}>Vote for 1</button>
        <button className="vote-button" onClick={() => handleVote('2')}>Vote for 2</button>
      </div>
    </div>
  );
};

export default VotingView;
