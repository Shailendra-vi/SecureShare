import React, { Component } from "react";
import axios from "axios";

const options=[
  {
    label:"Encrypt",
    value:"enc"
  },
  {
    label:"Decrypt",
    value:"dec"
  }
]

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentFileName:"",
        currentFile: undefined,
        password: "thisismypassword",
        mode:"dec",
        response: "",
        isUploaded: false,
      };
      this.selectFile=this.selectFile.bind(this);
      this.upload=this.upload.bind(this);
      this.download=this.download.bind(this);
      this.setMode=this.setMode.bind(this);
      this.setPassword=this.setPassword.bind(this);
  }
  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
      currentFileName: event.target.files[0]["name"],
    });
    console.log(event.target.files[0]["name"]);
  }
  setPassword(e){
    this.setState({
      password: e.target.value,
    });
  }
  setMode(e){
    this.setState({
      mode: e.target.value,
    })
  }
  download(){
    axios({
      url: "http://localhost:9090/download/"+this.state.currentFileName,
      method: 'GET',
      responseType: 'blob',
  }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', this.state.currentFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
  });
  }
  upload(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", this.state.currentFile);
    formData.append("password", this.state.password);
    formData.append("mode", this.state.mode);
    axios.post("http://localhost:9090/upload-file", 
      formData
    )
    .then((response)=>{
      this.setState({
        response: response,
        isUploaded: true,
      });
    });
    this.setState({
      currentFile: undefined,
    });
  }
  render() {
    const uploaded="Pls upload file then download";
    return (
      <div>
      <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>
        <input type="text" name="password" onSubmit={this.setPassword} />
        <div className="select-container">
          <select value={this.state.mode} onChange={this.setMode}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        {/* {this.state.currentFile} */}
        <button className="btn btn-success" onClick={this.upload}>
          Upload
        </button>
            <button className="btn btn-success" onClick={this.download}>
              Download
            </button>
        <div className="alert alert-light" role="alert">
          {uploaded}
        </div>
      </div>
    );
  }
}