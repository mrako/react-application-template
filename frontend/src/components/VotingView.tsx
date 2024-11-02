import React from 'react';
import axios from 'axios';

const VotingView: React.FC = () => {
  const handleVote = async (option: number) => {
    try {
      await axios.post('http://localhost:9000/api/votes', { option });
      alert(`Voted for ${option}!`);
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to submit vote.');
    }
  };

  return (
    <div>
      <h2>Vote for Your Option</h2>
      <button onClick={() => handleVote(1)}>Vote for Option 1</button>
      <button onClick={() => handleVote(2)}>Vote for Option 2</button>
    </div>
  );
};

export default VotingView;
