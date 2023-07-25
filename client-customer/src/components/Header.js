import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="border-bottom">
      <div className="float-left pt-5">
        {/* Your existing content */}
      </div>
      <div className="float-right flex items-center relative">
        <Link
          to="/mycart"
          className="flex items-center flex-col"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <span className="bg-[#c59d5f] px-2 py-1 rounded-full">{this.context.mycart.length}</span>
          <FontAwesomeIcon icon={faShoppingCart} className="text-4xl mr-2" />
        </Link>
        {showDropdown && (
          <div className="absolute top-full right-0 bg-white p-4 shadow">
            {/* Dropdown menu */}
            {/* Render every item in the float-left div */}
            <Link to="/login" className="block my-2">
              Login
            </Link>
            <Link to="/signup" className="block my-2">
              Sign-up
            </Link>
            <Link to="/active" className="block my-2">
              Active
            </Link>
            {/* More items can be added here */}
          </div>
        )}
      </div>
      <div className="float-clear" />
    </div>
  );
};

export default Header;
