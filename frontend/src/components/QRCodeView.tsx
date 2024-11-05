import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

import './QRCodeView.css';

const QRCodeComponent = () => {
  const currentDomain = window.location.origin;

  return (
    <div className="qr-container">
      <div className="qr-code-section">
        <QRCodeSVG
          value={currentDomain}
          size={1200}
          bgColor={"#ffd100"}
          fgColor={"#101820"}
          level={"L"}
          className="qr-code-view"
        />
      </div>
    </div>
  );
};

export default QRCodeComponent;
