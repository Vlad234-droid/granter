import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

// import { uploadFile } from "../../core/services";

import "./style.scss";

const DocumentViewer = ({ url }) => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (url.match(/\.[0-9a-z]+$/i)[0] === ".pdf") {
      setSrc(url);
    } else {
      setSrc(`https://view.officeapps.live.com/op/embed.aspx?src=${url}`);
    }
    console.log(url.match(/\.[0-9a-z]+$/i)[0]);
  }, [url]);

  return (
    <div className='document-viewer'>
      <iframe src={src} frameBorder='no' seamless />
    </div>
  );
};

export default DocumentViewer;
