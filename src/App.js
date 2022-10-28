import React from 'react';
// import Button from '@material-ui/core/Button';
import './first.css';

import UploadFiles from "./components/upload-file-component";

const App = () => {
  return (
    <>
    {/* <div className="button">
      <input type="file" style={{display: "none"}} id="contained-button-file" />
      <label htmlFor="contained-button-file" >
        <Button variant="contained" color="secondary" component="span">
          Upload
        </Button>
      </label>
    </div> */}
    <div className="container" style={{ width: "600px" }}>
      <div style={{ margin: "20px" }}>
        <h3>SecureShare.com</h3>
        <h4>React upload Files</h4>
      </div>
      <UploadFiles />
    </div>
    </>
  );
}
 
export default App;
