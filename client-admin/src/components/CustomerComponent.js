import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import swal from 'sweetalert';

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }
  render() {
    const customers = this.state.customers.map((item) => {
      return (
        <tr key={item._id} className="mt-12 border-t border-[#c59d5f]" onClick={() => this.trCustomerClick(item)}>
          <td className="p-6">{item._id}</td>
          <td className="p-6">{item.username}</td>
          <td className="p-6">{item.password}</td>
          <td className="p-6">{item.name}</td>
          <td className="p-6">{item.phone}</td>
          <td className="p-6">{item.email}</td>
          <td className="p-6">{item.active}</td>
          <td className="p-6">
            {item.active === 0 ?
              <span className="link hover:font-semibold text-center" onClick={() => this.lnkEmailClick(item)}>EMAIL</span>
              :
              <span className="link hover:font-semibold text-center" onClick={() => this.lnkDeactiveClick(item)}>DEACTIVE</span>}
          </td>
        </tr>
      );
    });
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="mt-12 border-t border-[#c59d5f] cursor-pointer" onClick={() => this.trOrderClick(item)}>
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
          <tr key={item.product._id} className="mt-12 border-t border-[#c59d5f] cursor-pointer">
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
          <h2 className="text-3xl mt-12 font-bold text-center">CUSTOMER LIST</h2>
          <table className=" border-t border-[#c59d5f] cursor-pointer" border="1">
            <tbody>
              <tr className="border-t border-[#c59d5f] cursor-pointer">
                <th className='p-6 text-[#c59d5f] text-center'>ID</th>
                <th className='p-6 text-[#c59d5f] text-center'>Username</th>
                <th className='p-6 text-[#c59d5f] text-center'>Password</th>
                <th className='p-6 text-[#c59d5f] text-center'>Name</th>
                <th className='p-6 text-[#c59d5f] text-center'>Phone</th>
                <th className='p-6 text-[#c59d5f] text-center'>Email</th>
                <th className='p-6 text-[#c59d5f] text-center'>Active</th>
                <th className='p-6 text-[#c59d5f] text-center'>Action</th>
              </tr>
              {customers}
            </tbody>
          </table>
        </div>
        {this.state.orders.length > 0 ?
          <div className="align-center">
            <h2 className="text-3xl mt-12 font-bold text-center">ORDER LIST</h2>
            <table className="border-t border-[#c59d5f] cursor-pointer" border="1">
              <tbody>
                <tr className="border-t border-[#c59d5f] cursor-pointer">
                  <th className='p-6 text-[#c59d5f] text-center'>ID</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Creation date</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Cust.name</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Cust.phone</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Total</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Status</th>
                </tr>
                {orders}
              </tbody>
            </table>
          </div>
          : <div />}
        {this.state.order ?
          <div className="align-center">
            <h2 className="text-3xl mt-12 font-bold text-center">ORDER DETAIL</h2>
            <table className="border-t border-[#c59d5f] cursor-pointer" border="1">
              <tbody>
                <tr className="border-t border-[#c59d5f] cursor-pointer">
                  <th className='p-6 text-[#c59d5f] text-center'>No.</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Prod.ID</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Prod.name</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Image</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Price</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Quantity</th>
                  <th className='p-6 text-[#c59d5f] text-center'>Amount</th>
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
    this.apiGetCustomers();
  }
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  trOrderClick(item) {
    this.setState({ order: item });
  }
  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }
  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetCustomers();
      } else {
        swal({
          title: "Deactive Failed!", 
          icon: "error",
          button: "OK!",
        });
      }
    });
  }

  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      if (result.success === true) {
        swal({
          title: "Please check email!", 
          icon: "success",
          button: "OK!",
        });
      } else{
        swal({
          title: (result.message),
          icon: "error",
          button: "OK!",
        });
      }
    });
  }
}
export default Customer;