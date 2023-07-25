import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import swal from 'sweetalert';

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="border-t border-[#c59d5f] cursor-pointer" onClick={() => this.trItemClick(item)}>
          <td className="p-6 text-center">{item._id}</td>
          <td className="p-6 text-center">{new Date(item.cdate).toLocaleString()}</td>
          <td className="p-6 text-center">{item.customer.name}</td>
          <td className="p-6 text-center">{item.customer.phone}</td>
          <td className="p-6 text-center">{item.total}</td>
          <td className="p-6 text-center">{item.status}</td>
          <td className="p-6 text-center">
            {item.status === 'PENDING' ?
              <div><span className="text-green-600 hover:font-semibold" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> || <span className="text-red-700 hover:font-semibold" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span></div>
              : <div />}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="border-t border-[#c59d5f] cursor-pointer">
            <td className="p-6 text-center">{index + 1}</td>
            <td className="p-6 text-center">{item.product._id}</td>
            <td className="p-6 text-center">{item.product.name}</td>
            <td className="p-6 text-center"><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td className="p-6 text-center">{item.product.price}</td>
            <td className="p-6 text-center">{item.quantity}</td>
            <td className="p-6 text-center">{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <div className="overflow-x-auto">
          <h2 className="text-3xl mt-12 font-bold text-center">ORDER LIST</h2>
          <table className="mx-auto mt-12 border-t border-[#c59d5f]" border="1">
            <tbody>
              <tr className="mt-12 border-t border-[#c59d5f]">
                <th className="p-6 text-[#c59d5f] text-center">ID</th>
                <th className="p-6 text-[#c59d5f] text-center">Creation date</th>
                <th className="p-6 text-[#c59d5f] text-center">Cust.name</th>
                <th className="p-6 text-[#c59d5f] text-center">Cust.phone</th>
                <th className="p-6 text-[#c59d5f] text-center">Total</th>
                <th className="p-6 text-[#c59d5f] text-center">Status</th>
                <th className="p-6 text-[#c59d5f] text-center">Action</th>
              </tr>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order ?
          <div className="overflow-x-auto">
            <h2 className="text-center mt-12 ">ORDER DETAIL</h2>
            <table className="mx-auto border-t mt-12 border-[#c59d5f]" border="1">
              <tbody>
                <tr className="border-t border-[#c59d5f]">
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
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }
  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        swal({
          title: "Update order status failed!", 
          icon: "error",
          button: "OK!",
        });
      }
    });
  }
}
export default Order;