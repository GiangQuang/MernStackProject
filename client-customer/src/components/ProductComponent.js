import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="inline-block p-4 max-w-xs hover:scale-125 hover:text-[#c59d5f]">
          <Link to={'/product/' + item._id}><img className='photo block mx-auto' src={"data:image/jpg;base64," + item.image} alt={item.name} /></Link>
          <div className="text-center hover:text-[#c59d5f] mt-2">
            <Link to={'/product/' + item._id} className="block font-medium truncate w-40 sm:w-48 md:w-60 lg:w-72 xl:w-80">
              {item.name}
            </Link>
            <Link to={'/product/' + item._id} className="block font-medium">
              ${item.price}
            </Link>
          </div>
        </div>
      );
    });
    return (
      <div className="text-center my-12">
        <h2 className="text-center">LIST PRODUCTS</h2>
        {prods}
      </div>
    );
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);