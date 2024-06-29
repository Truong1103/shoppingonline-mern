import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }

  btnUpdateClick = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const customer = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input username, password, name, phone, and email');
    }
  };

  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/customer/customers/${id}`, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Update successful!');
        this.context.setCustomer(result);
      } else {
        alert('Update failed!');
      }
    });
  }

  render() {
    const containerStyle = {
      backgroundImage: "url('https://media.tapeko.co.uk/wp-content/uploads/20240202035142/u96041p-1024x682.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '65vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    };

    const formStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.8)', /* semi-transparent white background */
      padding: '20px', /* Adjust padding as per your design */
      borderRadius: '15px', /* Reduce border radius for a smaller card */
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', /* subtle shadow */
      animation: 'fade-in 0.5s ease-in',
      maxWidth: '400px', /* Limit the maximum width of the card */
      width: '100%' /* Ensure the card fills its container */
    };

    const inputStyle = {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '15px',
      fontSize: '16px',
      boxSizing: 'border-box' // Ensures padding and border are included in the width
    };

    const submitStyle = {
      padding: '12px 48px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease', /* Add transition for smooth color change */
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' /* Optional: Add subtle shadow */
    };
    
    const submitHoverStyle = {
      backgroundColor: '#0056b3' /* Darker shade of blue on hover */
    };

    const headingStyle = {
      fontSize: '36px',
      color: 'red',
      fontWeight: 'bold',
      marginBottom: '20px',
      animation: 'slide-in 1s ease-in-out'
    };

    const { token } = this.context;
    if (token === '') return (<Navigate replace to='/login' />);

    return (
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2 style={headingStyle} className="text-center">MY PROFILE</h2>
          <form>
            <input type="text" style={inputStyle} value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} placeholder="Username" />
            <input type="password" style={inputStyle} value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} placeholder="Password" />
            <input type="text" style={inputStyle} value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} placeholder="Name" />
            <input type="tel" style={inputStyle} value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} placeholder="Phone" />
            <input type="email" style={inputStyle} value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} placeholder="Email" />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button type="submit" style={{ ...submitStyle, ...(this.state.hovering ? submitHoverStyle : {}) }} 
            onMouseEnter={() => this.setState({ hovering: true })}
            onMouseLeave={() => this.setState({ hovering: false })}
            onClick={this.btnUpdateClick}>UPDATE</button>            
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Myprofile;
