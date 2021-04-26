import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

// import { uploadFile } from "../../core/services";

import "./style.scss";

const DocumentViewer = (file) => {
  const [fileType, setFileType] = useState(null);

  return (
    <div className='document-viewer'>
      <iframe
        src='https://view.officeapps.live.com/op/embed.aspx?src=https://labsearch.dev.angleto.com/scooterok/PrivacyPolicy.docx'
        frameBorder='no'
        seamless
      />
    </div>
  );
};

export default DocumentViewer;
