import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} className="mt-12 border-t border-[#c59d5f] cursor-pointer" onClick={() => this.trItemClick(item)}>
          <td className="p-6 text-center">{item._id}</td>
          <td className="p-6 text-center">{item.name}</td>
        </tr>
      );
    });
    return (
      <div className='flex flex-wrap justify-evenly'>
        <div className="float-left overflow-x-auto">
          <h2 className="text-3xl mt-12 font-bold text-center">CATEGORY LIST</h2>
          <table className="mt-12 border-t border-[#c59d5f] cursor-pointer" border="1">
            <tbody>
              <tr className="mt-12 border-t border-[#c59d5f] cursor-pointer">
                <th className='p-6 text-[#c59d5f] text-center'>ID</th>
                <th className='p-6 text-[#c59d5f] text-center'>Name</th>
              </tr>
              {cates}
            </tbody>
          </table>
        </div>
        <div className="" />
            <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        <div className="float-clear" />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default Category;