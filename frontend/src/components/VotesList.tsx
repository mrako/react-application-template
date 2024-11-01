import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Vote {
  id: number;
  option: string;
}

const VotesList: React.FC = () => {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    // Connect to the backend WebSocket server on localhost:9000
    const socket: any = io('http://localhost:9000');

    // Listen for 'votesList' event and update the votes state
    socket.on('votesList', (data: Vote[]) => {
      console.log("received votesList");
      console.log(data);
      setVotes(data);
    });

    console.log("get votes");
    socket.emit('get votes');

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Votes List</h2>
      <ul>
        {votes.map((vote) => (
          <li key={vote.id}>{vote.option}</li>
        ))}
      </ul>
    </div>
  );
};

export default VotesList;
