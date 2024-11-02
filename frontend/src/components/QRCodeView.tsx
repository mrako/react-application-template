import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

import './QRCodeView.css';

const QRCodeComponent = () => {
  // Get the current domain
  const currentDomain = window.location.origin;

  return (
    <div className="qr-container">
      <QRCodeSVG
        value={currentDomain}
        size={1200}
        bgColor={"#ffd100"}
        fgColor={"#010101"}
        level={"L"}
        className="qr-code"
      />
    </div>
  );
};

export default QRCodeComponent;
