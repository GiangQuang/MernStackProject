import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

class ProductDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">PRODUCT DETAILS</h2>
          <div className="flex flex-col items-center md:flex-row w-full max-w-screen-md">
            <div className="w-full md:w-1/2">
              <img className='block mx-auto' src={"data:image/jpg;base64," + prod.image} width="400px" height="400px" alt="" />
            </div>
            <div className="w-full md:w-1/2 px-4 py-2">
              <form className="lg:items-start items-center flex flex-col">
                <div className="mb-4">
                  <label className="font-semibold">Name: &nbsp;</label>
                  <span>{prod.name}</span>
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Price: &nbsp;</label>
                  <span>${prod.price}</span>
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Category: &nbsp;</label>
                  <span>{prod.category.name}</span>
                </div>
                <div className="mb-4 flex items-center">
                  <label className="font-semibold mr-2">Quantity:</label>
                  <div className="flex">
                    <button
                      type="button" onClick={() => this.handleQuantityChange('decrease')}
                      className="flex items-center justify-center px-2">
                      <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                    <input
                      type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }}
                      className="dark-mode-text-field flex-1 px-2 text-center rounded-md px-2 py-1 w-24"/>
                    <button
                      type="button" onClick={() => this.handleQuantityChange('increase')}
                      className="flex items-center justify-center px-2">
                      <FontAwesomeIcon icon={faCaretUp} />
                    </button>
                  </div>
                </div>
                <div>
                  <button type="submit" onClick={(e) => this.btnAdd2CartClick(e)} className="filter-btn">
                    ADD TO CART
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    return (<div />);
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      swal({
        title: "Add to cart successful!",
        icon: "success",
        button: "OK!",
      });
    } else {
      swal({
        title: "Please input quantity!",
        icon: "error",
        button: "OK!",
      });
    }
  }
  handleQuantityChange = (action) => {
    const { txtQuantity } = this.state;
    const quantity = parseInt(txtQuantity);
    if (action === 'increase') {
      this.setState({ txtQuantity: String(quantity + 1) });
    } else if (action === 'decrease') {
      if (quantity > 1) {
        this.setState({ txtQuantity: String(quantity - 1) });
      }
    }
  };
}
export default withRouter(ProductDetail);