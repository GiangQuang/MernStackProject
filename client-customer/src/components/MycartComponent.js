import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import ConfirmationPopup from './ConfirmationPopup';
import swal from 'sweetalert';

class Mycart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
    };
  }
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="border-t border-[#c59d5f]">
          <td className="p-6 text-center">{index + 1}</td>
          <td className="p-6 text-center">{item.product.name}</td>
          <td className="p-6 text-center">{item.product.category.name}</td>
          <td className="p-6"><img className='block mx-auto' src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
          <td className="p-6 text-center">${item.product.price}</td>
          <td className="p-6 text-center">{item.quantity}</td>
          <td className="p-6 text-center">${item.product.price * item.quantity}</td>
          <td className="p-6 text-center"><span className="text-red-600 cursor-pointer" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span></td>
        </tr>
      );
    });
    return (
      <div className="overflow-x-auto container mx-auto mt-6">
        <h2 className="text-3xl font-bold text-center">ITEM LIST</h2>
        <table className="w-full mt-4 table-auto">
          <thead>
            <tr className="border-t border-b border-[#c59d5f] bg-transparent">
              <th className="p-6 text-[#c59d5f]">No.</th>
              <th className="p-6 text-[#c59d5f]">Name</th>
              <th className="p-6 text-[#c59d5f]">Category</th>
              <th className="p-6 text-[#c59d5f]">Image</th>
              <th className="p-6 text-[#c59d5f]">Price</th>
              <th className="p-6 text-[#c59d5f]">Quantity</th>
              <th className="p-6 text-[#c59d5f]">Amount</th>
              <th className="p-6 text-[#c59d5f]">Action</th>
            </tr>
          </thead>
          <tbody>
            {mycart}
            <tr className="border-t border-[#c59d5f] bg-transparent">
              <td colSpan="5"></td>
              <td className="p-6 text-center font-bold  text-[#c59d5f]">Total</td>
              <td className="p-6 text-center font-bold text-[#c59d5f]">${CartUtil.getTotal(this.context.mycart)}</td>
              <td className="p-6 text-center font-bold"><span className="text-blue-600 cursor-pointer" onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span></td>
            </tr>
          </tbody>
        </table>
        {this.state.showConfirmation && (
          <ConfirmationPopup
            message="ARE YOU SURE?"
            onConfirm={() => this.handleConfirmation(true)}
            onCancel={() => this.handleConfirmation(false)}
          />
        )}
      </div>
    );
  }
  
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
  lnkCheckoutClick() {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willProceed) => {
      if (willProceed) {
        if (this.context.mycart.length > 0) {
          const total = CartUtil.getTotal(this.context.mycart);
          const items = this.context.mycart;
          const customer = this.context.customer;
          if (customer) {
            this.apiCheckout(total, items, customer);
          } else {
            this.props.navigate('/login');
          }
        } else {
          swal({
            title: "Your cart is empty!",
            icon: "error",
            button: "OK!",
          });
        }
      }
    });
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        swal({
          title: "Checkout successful!",
          icon: "success",
          button: "OK!",
        });
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        swal({
          title: "Checkout failed!",
          icon: "error",
          button: "OK!",
        });
      }
    });
    
  }
}
export default withRouter(Mycart);