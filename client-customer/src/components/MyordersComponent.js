import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="border-t border-[#c59d5f] cursor-pointer" onClick={() => this.trItemClick(item)}>
          <td className="p-6 text-center">{item._id}</td>
          <td className="p-6 text-center">{new Date(item.cdate).toLocaleString()}</td>
          <td className="p-6 text-center">{item.customer.name}</td>
          <td className="p-6 text-center">{item.customer.phone}</td>
          <td className="p-6 text-center">{item.total}</td>
          <td className="p-6 text-center">{item.status}</td>
        </tr>
      );
    });
  
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="border-t border-[#c59d5f]">
            <td className="p-6 text-center">{index + 1}</td>
            <td className="p-6 text-center">{item.product._id}</td>
            <td className="p-6 text-center">{item.product.name}</td>
            <td className="p-6"><img className='block mx-auto' src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td className="p-6 text-center">${item.product.price}</td>
            <td className="p-6 text-center">{item.quantity}</td>
            <td className="p-6 text-center">${item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
  
    return (
      <div>
        <div className="align-center mt-12">
          <h2 className="text-center">ORDER LIST</h2>
          <table className="table-auto w-full">
            <tbody>
              <tr className="">
                <th className="p-6 text-[#c59d5f] text-center">ID</th>
                <th className="p-6 text-[#c59d5f] text-center">Creation date</th>
                <th className="p-6 text-[#c59d5f] text-center">Cust.name</th>
                <th className="p-6 text-[#c59d5f] text-center">Cust.phone</th>
                <th className="p-6 text-[#c59d5f] text-center">Total</th>
                <th className="p-6 text-[#c59d5f] text-center">Status</th>
              </tr>
              {orders}
            </tbody>
          </table>
        </div>
  
        {this.state.order &&
          <div className="align-center mt-12">
            <h2 className="text-center">ORDER DETAIL</h2>
            <table className=" table-auto w-full">
              <tbody>
                <tr className="">
                  <th className="p-6 text-[#c59d5f] text-center">No.</th>
                  <th className="p-6 text-[#c59d5f] text-center">Prod.ID</th>
                  <th className="p-6 text-[#c59d5f] text-center">Prod.name</th>
                  <th className="p-6 text-[#c59d5f] text-center">Image</th>
                  <th className="p-6 text-[#c59d5f] text-center">Price</th>
                  <th className="p-6 text-[#c59d5f] text-center">Quantity</th>
                  <th className="p-6 text-[#c59d5f] text-center">Amount</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
  
  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Myorders;