import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { QRCodeSVG } from 'qrcode.react';

import './VoteResults.css';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:9000';

interface Vote {
  id: number;
  option: string;
}

interface VoteCounts {
  [option: string]: number;
}

const VoteResults: React.FC = () => {
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({});
  const rootDomain = window.location.origin.replace(/^https?:\/\//, '');

  useEffect(() => {
    const socket = io(`${ENDPOINT}`, { transports: ['websocket'] });

    // Listen for updates to the vote list
    socket.on('votesList', (data: any) => {
      console.log(data);

      setVoteCounts(data);
    });

    // Clean up socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const totalVotes = (voteCounts['1'] || 0) + (voteCounts['2'] || 0);
  const optionOnePercentage = totalVotes > 0 ? ((voteCounts['1'] || 0) / totalVotes) * 100 : 50;
  const optionTwoPercentage = totalVotes > 0 ? ((voteCounts['2'] || 0) / totalVotes) * 100 : 50;

  return (
    <div className="results-container">
      <div className="results-bar">
        <div
          className="results-section option-one"
          style={{ flex: `${optionOnePercentage} 1 0%` }}
        >
          <h3>AI-driven Development</h3>
          <p>{optionOnePercentage.toFixed(1)}% ({voteCounts['1'] || 0} votes)</p>
        </div>

        <div
          className="results-section option-two"
          style={{ flex: `${optionTwoPercentage} 1 0%` }}
        >
          <h3>Platform Engineering</h3>
          <p>{optionTwoPercentage.toFixed(1)}% ({voteCounts['2'] || 0} votes)</p>
        </div>
      </div>

      <div className="root-domain-banner">
        {rootDomain}
      </div>
    </div>
  );
};

export default VoteResults;
