import React from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const FutureClaimsPage = () => {
  const docs = [
    // {
    //   uri: "../../assets/pdf.pdf",
    // },
    { uri: require("../../assets/iCureProgress.xlsx") },
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
};

export default FutureClaimsPage;
