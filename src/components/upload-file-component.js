import React, { Component } from "react";
import axios from "axios";
// import Button from '@material-ui/core/Button';

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentFile: undefined,
        password: "shailendra",
        mode:"enc",
        progress: 0,
        message: "",
  
        // fileInfos: [],
      };
      this.selectFile=this.selectFile.bind(this);
      this.upload=this.upload.bind(this);
  }
  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
    });
    console.log(event.target.files[0]);
  }
  upload(event) {
    // console.log(this.state.currentFile);
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", this.state.currentFile);
    formData.append("password", this.state.password);
    formData.append("mode", this.state.mode);

    axios.post("http://localhost:9090/upload-file", 
      formData
    ).then((response)=>{
      console.log(response);
    });
    this.setState({
      currentFile: undefined,
    });
  }
  

  render() {
    const {
      currentFile,
      progress,
      message,
    } = this.state;

    return (
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

    {/* <input type="file" onChange={this.selectFile} style={{display: "none"}} id="contained-button-file" />
      <label htmlFor="contained-button-file" >
        <Button variant="contained" color="secondary" component="span">
          Upload
        </Button>
      </label> */}

      <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>
        {/* {this.state.currentFile} */}
        <button className="btn btn-success" onClick={this.upload} >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>
      </div>
    );
  }
}