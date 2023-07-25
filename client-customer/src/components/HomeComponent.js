import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotprods: []
    };
  }
  render() {
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline-block p-4 max-w-xs hover:scale-125 hover:text-[#c59d5f]">
        <Link to={'/product/' + item._id}><img className='photo' src={"data:image/jpg;base64," + item.image} alt={item.name} /></Link>
        <div className="text-center mt-2">
          <Link to={'/product/' + item._id} className="block font-medium">
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
      <div>
        {this.state.hotprods.length > 0 ?
          <div className="text-center my-12">
            <h2 className="text-center">HOT PRODUCTS</h2>
            {hotprods}
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetHotProducts();
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;