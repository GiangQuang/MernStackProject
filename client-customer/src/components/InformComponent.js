import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom">
        <div className="lg:float-left pt-4">
          {this.context.token === '' ?
            <div className="lg:flex gap-2 lg:pb-4 lg:flex-row flex flex-wrap justify-center">
              <Link className='filter-btn' to='/login'>Login</Link>
              <Link className='filter-btn' to='/signup'>Sign-up</Link>
              <Link className='filter-btn' to='/active'>Active</Link>
           </div>
            :
            <div className="lg:flex gap-2 lg:pb-4 lg:flex-row flex flex-wrap justify-center items-center">
              <div>
                <Link className='filter-btn' to='/myprofile'>My profile</Link>
                <Link className='filter-btn' to='/myorders'>My orders</Link>
                </div>  
            </div>
          }
        </div>
        <div className="lg:float-right flex flex-col lg:flex-row lg:pt-0">
          <Link to='/mycart' className="flex items-center flex-col">
            <span className="bg-[#c59d5f] px-2 py-1 rounded-full">{this.context.mycart.length}</span>
            <FontAwesomeIcon icon={faShoppingCart} className="text-4xl mr-2" />
          </Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
  
}
export default Inform;