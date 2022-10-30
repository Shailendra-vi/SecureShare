import React from 'react';

import UploadFiles from "./components/upload-file-component";
import Navbar from './components/navbar';

const App = () => {
  return (
    <>
    <Navbar />
    <div>
      <UploadFiles />
    </div>
    </>
  );
}
 
export default App;
