import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { QRCodeSVG } from 'qrcode.react';

import './VoteResults.css';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:9000';

interface Vote {
  id: number;
  option: string;
}

const VoteResults: React.FC = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const rootDomain = window.location.origin;

  useEffect(() => {
    const socket = io(`${ENDPOINT}`, { transports: ['websocket'] });

    // Listen for updates to the vote list
    socket.on('votesList', (data: Vote[]) => {
      setVotes(data);
    });

    // Clean up socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Count votes by option "1" and "2"
  const voteCounts = votes.reduce((counts, vote) => {
    counts[vote.option] = (counts[vote.option] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  const totalVotes = (voteCounts['1'] || 0) + (voteCounts['2'] || 0);
  const optionOnePercentage = totalVotes > 0 ? (voteCounts['1'] / totalVotes) * 100 : 50;
  const optionTwoPercentage = totalVotes > 0 ? (voteCounts['2'] / totalVotes) * 100 : 50;

  const largerOption = optionOnePercentage > 30 ? 'option-one' : 'option-two';

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

      <div className={`qr-code-container ${largerOption}`}>
        <QRCodeSVG
          value={rootDomain}
          size={400}
          bgColor={largerOption ? "#ffd100" : "#010101"}
          fgColor={largerOption ? "#010101" : "#ffd100"}
          level={"L"}
          className="results-qr-code"
        />
      </div>
    </div>
  );
};

export default VoteResults;
