import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import DarkModeButton from './DarkmodeButton';
import MyContext from '../contexts/MyContext';
import swal from 'sweetalert';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      isExpanded: false
    };
  }
  static contextType = MyContext;
  render() {
    const { txtKeyword, isExpanded } = this.state;
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu lg:mr-4 mb-6 lg:mb-0">
          <Link className='filter-btn' to={'/product/category/' + item._id}>{item.name}</Link>
        </li>
      );
    });
    
    return (
      <div className="border-bottom">
        <div className="lg:float-left pt-2">
          <ul className="menu m-4 lg:flex lg:flex-row flex flex-wrap justify-center items-center">
            <li className="menu lg:mr-4 mb-6 lg:mb-0">
              <Link className='filter-btn' to='/'>Home</Link>
            </li>
            {cates}
          </ul>
        </div>
        <div className="lg:float-right gap-2 lg:ml-4 flex flex-col lg:flex-row items-center lg:pt-0">
          <div className="search-container lg:hidden">
            <form className={`search ${isExpanded ? 'expanded' : ''}`} onSubmit={this.handleSubmit}>
              <input
                type="search"
                placeholder="Enter keyword"
                className={`search-input ${isExpanded ? 'expanded' : ''} dark-mode-text-field`}
                value={txtKeyword}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
              <button type="submit" className="search-button" onClick={(e) => this.btnSearchClick(e)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>
          </div>
          <DarkModeButton />
          <div className='pb-2 lg:pt-1'>
            {this.context.token === '' ? 
              <div></div>    
              : 
              <div><Link className='filter-btn' to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link> </div>  }
            
          </div>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  // event-handlers
  handleInputChange = (e) => {
    this.setState({ txtKeyword: e.target.value });
  };
  btnSearchClick(e) {
    e.preventDefault();
    if (this.state.txtKeyword === '') {
      swal({
        title: "Your search is empty!",
        icon: "error",
        button: "OK!",
      });
    } else {
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
  }
  handleInputFocus = () => {
    this.setState({ isExpanded: true });
  };

  handleInputBlur = () => {
    this.setState({ isExpanded: false });
  };
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default withRouter(Menu);
