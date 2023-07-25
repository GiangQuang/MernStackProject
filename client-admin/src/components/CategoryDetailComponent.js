import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import swal from 'sweetalert';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-3xl mt-12 font-bold text-center">CATEGORY DETAIL</h2>
        <form className="w-80">
          <div className="mb-4">
            <label className="block text-sm font-medium">ID</label>
            <input type="text" value={this.state.txtID} onChange={(e) => {this.setState({ txtID: e.target.value });}} readOnly={true}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input type="text" value={this.state.txtName} onChange={(e) => {this.setState({ txtName: e.target.value });}}
              className="dark-mode-text-field w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-[#c59d5f]"/>
          </div>
          <div className="mb-4">
            <input type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)}
              className="w-full px-4 py-2 bg-[#c59d5f] rounded-lg shadow hover:bg-amber-700 focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer"/>
          </div>
          <div className="mb-4">
            <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)}
              className="w-full px-4 py-2 bg-[#c59d5f] rounded-lg shadow hover:bg-amber-700 focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer" />
          </div>
          <div>
            <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)}
              className="w-full px-4 py-2 bg-[#c59d5f] rounded-lg shadow hover:bg-amber-700 focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer "/>
          </div>
        </form>
      </div>

    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      swal({
        title: "Please input category name!",
        icon: "error",
        button: "OK!",
      });
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      swal({
        title: "Please input ID and category name!",
        icon: "error",
        button: "OK!",
      });
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    swal({
      title: "Do you want to delete this category?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const id = this.state.txtID;
        if (id) {
          this.apiDeleteCategory(id);
        } else {
          swal({
            title: "Please select or input category!",
            icon: "error",
            button: "OK!",
          });
        }
      }
    });
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        swal({
          title: "Add category successful!", 
          icon: "success",
          button: "OK!",
        });
        this.apiGetCategories();
      } else {
        swal({
          title: "Add category failed!", 
          icon: "error",
          button: "OK!",
        });
      }
    });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }

  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        swal({
          title: "Update category successful!", 
          icon: "success",
          button: "OK!",
        });
        this.apiGetCategories();
      } else {
        swal({
          title: "Update category failed!", 
          icon: "error",
          button: "OK!",
        });
      }
    });
  }

  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        swal({
          title: "Delete category successful!", 
          icon: "success",
          button: "OK!",
        });
        this.apiGetCategories();
      } else {
        swal({
          title: "Delete category failed!", 
          icon: "error",
          button: "OK!",
        });
      }
    });
  }
}
export default CategoryDetail;