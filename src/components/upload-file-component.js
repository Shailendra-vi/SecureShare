import React, { Component } from "react";
import axios from "axios";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFileName: "",
      currentFile: undefined,
      password: "thisismypassword",
      mode: "dec",
      response: "",
      isUploaded: false,
    };
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.download = this.download.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }
  selectFile(event) {
    event.preventDefault();
    this.setState({
      currentFile: event.target.files[0],
      currentFileName: event.target.files[0]["name"],
    });
    console.log(event.target.files[0]["name"]);
  }
  setPassword(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      password: e.target.value,
    });
  }
  setMode(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      mode: e.target.value,
    })
  }
  download() {
    axios({
      url: "http://localhost:9090/download/" + this.state.currentFileName,
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
      .then((response) => {
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
    const uploaded = "Pls upload file then download";
    return (
      <div className="justify-between items-center text-white h-24 max-w-[1240px] mx-auto px-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" onChange={this.selectFile} />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your password" type="password" onChange={this.setPassword} />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          <select onChange={this.setMode} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
            <option>Choose an option</option>
            <option value="enc">Encryption</option>
            <option value="dec">Decryption</option>
          </select>
        </label>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={this.upload}>
          Upload
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={this.download}>
          Download
        </button>
        <div>
          {uploaded}
        </div>
      </div>
    );
  }
}