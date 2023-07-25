import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import swal from 'sweetalert';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div className="flex flex-col items-center border-2 border-[#c59d5f] rounded-lg p-4 mt-4">
        <h2 className="text-center text-2xl font-bold my-6">PRODUCT DETAIL</h2>
        <form className="w-80">
          <div className="mb-4">
            <label className="block text-sm font-medium">ID</label>
            <input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Price</label>
            <input type="text" value={this.state.txtPrice} onChange={(e) => { this.setState({ txtPrice: e.target.value }) }}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Image</label>
            <input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category</label>
            <select onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]">
              {cates}
            </select>
          </div>
          <div className="flex flex-col gap-y-6 justify-between items-center">
            <div>
              <img src={this.state.imgProduct} width="300px" height="300px" alt="" />
            </div>
            <div className='flex gap-x-6'>
              <input type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)}
                className="cursor-pointer px-4 py-2 bg-[#c59d5f] rounded-lg shadow hover:bg-[#b09550] focus:outline-none focus:ring focus:ring-blue-200"/>
              <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)}
                className="cursor-pointer px-4 py-2 bg-[#c59d5f] rounded-lg shadow hover:bg-[#b09550] focus:outline-none focus:ring focus:ring-blue-200" />
              <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)}
                className="cursor-pointer px-4 py-2 bg-[#c59d5f] rounded-lg shadow hover:bg-[#b09550] focus:outline-none focus:ring focus:ring-blue-200"/>
            </div>
          </div>
        </form>
      </div>

    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      swal({
        title: "Please input name and price and category and image!",
        icon: "error",
        button: "OK!",
      });
    }
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      swal({
        title: "Please input id and name and price and category and image!",
        icon: "error",
        button: "OK!",
      });
    }
  }
  btnDeleteClick(e) {
    e.preventDefault();
    swal({
      title: "Do you want to delete this product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const id = this.state.txtID;
        if (id) {
          this.apiDeleteProduct(id);
        } else {
          swal({
            title: "Please select or input product!",
            icon: "error",
            button: "OK!",
          });
        }
      }
    });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        swal({
          title: "Add product successful",
          icon: "success",
          button: "OK!",
        });
        this.apiGetProducts();
      } else {
        swal({
          title: "Add product failed",
          icon: "error",
          button: "OK!",
        });
      }
    });
  }
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages);
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages);
      } else {
        axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages);
        });
      }
    });
  }
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        swal({
          title: "Update product successful",
          icon: "success",
          button: "OK!",
        });
        this.apiGetProducts();
      } else {
        swal({
          title: "Update product failed",
          icon: "error",
          button: "OK!",
        });
      }
    });
  }
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        swal({
          title: "Delete product successful",
          icon: "success",
          button: "OK!",
        });
        this.apiGetProducts();
      } else {
        swal({
          title: "Delete product failed",
          icon: "error",
          button: "OK!",
        });;
      }
    });
  }
}
export default ProductDetail;