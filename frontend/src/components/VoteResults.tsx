import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Vote {
  id: number;
  option: string;
}

const VoteResults: React.FC = () => {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:9000');

    // Listen for updates to the vote list
    socket.on('votesList', (data: Vote[]) => {
      setVotes(data);
    });

    // Clean up socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Count votes by option
  const voteCounts = votes.reduce((counts, vote) => {
    counts[vote.option] = (counts[vote.option] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return (
    <div>
      <h2>Vote Results</h2>
      <ul>
        {Object.entries(voteCounts).map(([option, count]) => (
          <li key={option}>
            {option}: {count} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteResults;
