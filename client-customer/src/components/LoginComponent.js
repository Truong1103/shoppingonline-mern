import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  render() {
    return (
      <div style={styles.alignCenter}>
        <div style={styles.loginContainer}>
          <div style={styles.loginImgContainer}>
            <img src="https://cdn-icons-png.flaticon.com/256/7381/7381253.png" alt="Login" style={styles.loginImage} />
          </div>
          <h2 style={styles.title}>CUSTOMER LOGIN</h2>
          <form>
            <div style={styles.inputGroup}>
              <FaUser style={styles.icon} />
              <input
                type="text"
                placeholder="Username"
                value={this.state.txtUsername}
                onChange={(e) => {
                  this.setState({ txtUsername: e.target.value });
                }}
                style={styles.input} // Apply input style
              />
            </div>
            <div style={styles.inputGroup}>
              <FaLock style={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                value={this.state.txtPassword}
                onChange={(e) => {
                  this.setState({ txtPassword: e.target.value });
                }}
                style={styles.input} // Apply input style
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="submit"
                value="LOGIN"
                onClick={(e) => this.btnLoginClick(e)}
                style={styles.submitButton} // Apply submitButton style
              />
            </div>
            <div style={styles.forgotPassword}>
              <Link to="/resetpwd" style={styles.forgotPasswordLink}>
                Forgot Username / Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      toast.warning("Please input username and password");
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
        toast.success("Welcome to ShoppingOnline");
      } else {
        toast.error(result.message);
      }
    });
  }
}

const styles = {
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh',
    backgroundImage: 'url(https://e1.pxfuel.com/desktop-wallpaper/581/154/desktop-wallpaper-backgrounds-for-login-page-login-page.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: 0,
    overflow: 'hidden',
  },
  loginContainer: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: '#CA0DF9',
    width: '400px',
    boxSizing: 'border-box',
  },
  loginImgContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  loginImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  title: {
    marginBottom: '20px',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px 10px 10px 40px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    boxSizing: 'border-box',
  },
  icon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#ccc',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '20px',
    background: 'green', // Adjusted gradient background
    color: '#fff',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease',
    outline: 'none',
  },
  forgotPassword: {
    marginTop: '15px',
  },
  forgotPasswordLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
};


export default withRouter(Login);
