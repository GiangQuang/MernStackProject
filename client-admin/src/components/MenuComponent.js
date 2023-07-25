import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import DarkModeButton from './DarkmodeButton';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom">
        <div className="lg:float-left pt-2">
          <ul className="lg:flex lg:flex-row flex flex-wrap justify-center">
            <li className="lg:mr-4 mb-6 lg:mb-0">
              <Link className='filter-btn' to='/admin/home'>Home</Link>
            </li>
            <li className="lg:mr-4 mb-6 lg:mb-0">
              <Link className='filter-btn' to='/admin/category'>Category</Link>
            </li>
            <li className="lg:mr-4 mb-6 lg:mb-0">
              <Link className='filter-btn' to='/admin/product'>Product</Link>
            </li>
            <li className="lg:mr-4 mb-6 lg:mb-0">
              <Link className='filter-btn' to='/admin/order'>Order</Link>
            </li>
            <li className="lg:mr-4 mb-6 lg:mb-0">
              <Link className='filter-btn' to='/admin/customer'>Customer</Link>
            </li>
          </ul>
        </div>
        <div className="lg:float-right lg:ml-4 flex flex-col lg:flex-row items-center lg:pt-0">
          <DarkModeButton />
          <div className='pt-2 lg:pt-0'>Hello <b>{this.context.username}</b> | <Link className='filter-btn' to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link></div>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;