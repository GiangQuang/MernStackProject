import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-center text-2xl font-bold my-6">ACTIVE ACCOUNT</h2>
        <form className="w-80">
          <div className="mb-4">
            <label className="block text-sm font-medium">ID</label>
            <input
              type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f] dark-mode-text-field"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Token</label>
            <input
              type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value })}}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f] dark-mode-text-field"/>
          </div>
          <div>
            <button
              type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)}
              className="w-full px-4 py-2 text-white bg-[#c59d5f] rounded-lg shadow hover:bg-amber-700 focus:outline-none focus:ring focus:ring-blue-200">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      swal({
        title: "Please input ID and Token!",
        icon: "error",
        button: "OK!",
      });
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        swal({
          title: "Active successful!",
          icon: "success",
          button: "OK!",
        });
      } else {
        swal({
          title: "Incorrect ID or Token!",
          icon: "error",
          button: "OK!",
        });
      }
    });
  }
}
export default Active;