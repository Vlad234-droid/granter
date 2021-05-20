import React, { useState, useEffect } from 'react';

import './style.scss';

const DocumentViewer = ({ url }) => {
  const [src, setSrc] = useState('');
  useEffect(() => {
    if (url.match(/\.[0-9a-z]+$/i)[0] === '.pdf') {
      setSrc(url);
    } else {
      setSrc(`https://view.officeapps.live.com/op/embed.aspx?src=${url}`);
    }
  }, [url]);

  return (
    <div className="document-viewer">
      <iframe src={src} frameBorder="no" seamless title={src} />
    </div>
  );
};

export default DocumentViewer;
