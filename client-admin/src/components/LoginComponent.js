import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import swal from 'sweetalert';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <div className="flex align-valign-center flex-col items-center">
          <h2 className="text-center text-2xl font-bold my-6">ADMIN LOGIN</h2>
          <form className="w-80">
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div>
            <button
              type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)}
              className="dark-mode-text-field w-full px-4 py-2 text-white bg-[#c59d5f] rounded-lg shadow hover:bg-amber-700 focus:outline-none focus:ring focus:ring-blue-200">
              LOGIN
            </button>
          </div>
        </form>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      swal({
        title: "Please input username and password!", 
        icon: "error",
        button: "OK!",
      });
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        swal({
          title: (result.message),
          icon: "error",
          button: "OK!",
        });
      }
    });
  }
}
export default Login;