import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="mt-12 border-t border-[#c59d5f] cursor-pointer" onClick={() => this.trItemClick(item)}>
          <td className="p-6 text-center">{item._id}</td>
          <td className="p-6 text-center">{item.name}</td>
          <td className="p-6 text-center">{item.price}</td>
          <td className="p-6 text-center">{new Date(item.cdate).toLocaleString()}</td>
          <td className="p-6 text-center">{item.category.name}</td>
          <td><img className='block mx-auto' src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (
          <span key={index} className="px-2 py-1 mx-1 bg-[#c59d5f] font-bold rounded">
            {index + 1}
          </span>);
      } else {
        return (
          <span
            key={index} className="mx-auto px-2 py-1 mx-1 bg-transparent border border-[#c59d5f] rounded cursor-pointer hover:bg-amber-700"
            onClick={() => this.lnkPageClick(index + 1)}>
            {index + 1}
          </span>
        );
      }
    });
    
    return (
      <div className='flex flex-wrap justify-center'>
        <div className="float-left overflow-x-auto">
          <h2 className="text-3xl mt-12 font-bold text-center">PRODUCT LIST</h2>
          <table className="mt-12 border-t border-[#c59d5f] cursor-pointer" border="1">
            <tbody>
              <tr className="mt-12 border-t border-[#c59d5f] cursor-pointer">
                <th className='p-6 text-[#c59d5f] text-center'>ID</th>
                <th className='p-6 text-[#c59d5f] text-center'>Name</th>
                <th className='p-6 text-[#c59d5f] text-center'>Price</th>
                <th className='p-6 text-[#c59d5f] text-center'>Creation date</th>
                <th className='p-6 text-[#c59d5f] text-center'>Category</th>
                <th className='p-6 text-[#c59d5f] text-center'>Image</th>
              </tr>
              {prods}
              <tr>
                <td className='text-center' colSpan="6">{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="" />
            <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  updateProducts = (products, noPages) => { // arrow-function
    this.setState({ products: products, noPages: noPages });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;