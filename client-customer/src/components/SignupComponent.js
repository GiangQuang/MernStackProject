import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-center text-2xl font-bold my-6">SIGN-UP</h2>
        <form className="w-80">
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input type="text" value={this.state.txtUsername}onChange={(e) => {this.setState({ txtUsername: e.target.value });}}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input type="password" value={this.state.txtPassword} onChange={(e) => {this.setState({ txtPassword: e.target.value });}}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input type="text" value={this.state.txtName} onChange={(e) => {this.setState({ txtName: e.target.value });}}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input type="tel" value={this.state.txtPhone} onChange={(e) => {this.setState({ txtPhone: e.target.value });}}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" value={this.state.txtEmail}onChange={(e) => {this.setState({ txtEmail: e.target.value })}}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div>
            <button type="submit" onClick={(e) => this.btnSignupClick(e)}
              className="w-full px-4 py-2 text-white bg-[#c59d5f] rounded-lg shadow hover:bg-amber-700 focus:outline-none focus:ring focus:ring-blue-200">
              SIGN-UP
            </button>
          </div>
        </form>
      </div>

    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      swal({
        title: "Please input username and password and name and phone and email!",
        icon: "warning",
        button: "OK!",
      });
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      swal({
        title: (result.message),
        icon: "warning",
        button: "OK!",
      });
    });
  }
}
export default Signup;