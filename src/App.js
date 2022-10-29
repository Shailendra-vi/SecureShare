import React from 'react';
import './first.css';

import UploadFiles from "./components/upload-file-component";

const App = () => {
  return (
    <>
    <div className="container" style={{ width: "600px", margin: "20px"}}>
      <div>
        <h1>SecureShare.com</h1>
        <h4>Upload Your Files</h4>
      </div>
      <UploadFiles />
    </div>
    </>
  );
}
 
export default App;
