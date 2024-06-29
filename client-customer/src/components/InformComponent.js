import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faCheckCircle, faShoppingCart, faSignOutAlt, faUserCircle, faClipboardList } from '@fortawesome/free-solid-svg-icons';

class Inform extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          {this.context.token === '' ? (
            <div>
              <Link to="/login" className="styled-link login-link">
                <FontAwesomeIcon icon={faUser} className="link-icon" /> Login
              </Link> |
              <Link to="/signup" className="styled-link signup-link">
                <FontAwesomeIcon icon={faUserPlus} className="link-icon" /> Sign-up
              </Link> |
              <Link to="/active" className="styled-link active-link">
                <FontAwesomeIcon icon={faCheckCircle} className="link-icon" /> Active
              </Link>
            </div>
          ) : (
            <div>
              Hello <b>{this.context.customer.name}</b> |
              <Link to="/home" className="styled-link logout-link" onClick={() => this.lnkLogoutClick()}>
                <FontAwesomeIcon icon={faSignOutAlt} className="link-icon" /> Logout
              </Link> |
              <Link to="/myprofile" className="styled-link profile-link">
                <FontAwesomeIcon icon={faUserCircle} className="link-icon" /> My profile
              </Link> |
              <Link to="/myorders" className="styled-link orders-link">
                <FontAwesomeIcon icon={faClipboardList} className="link-icon" /> My orders
              </Link>
            </div>
          )}
        </div>
        <div className="float-right">
          <Link to="/mycart" className="styled-link cart-link">
            <FontAwesomeIcon icon={faShoppingCart} className="link-icon" /> My cart
          </Link> <b>have <span className="cart-item-count">{this.context.mycart.length}</span> items</b>
        </div>
        <div className="float-clear" />
      </div>
    );
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;
