import axios from 'axios';
import React, { Component } from 'react';
import { FaUser, FaLock, FaAddressCard, FaPhone, FaEnvelope } from 'react-icons/fa';

class Signup extends Component {
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

  render() {
    const styles = {
      body: {
        margin: 0,
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, #6B00FF, #FF005C)',
        height: '65vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      container: {
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '800px',
        maxWidth: '100%',
        overflow: 'hidden'
      },
      leftPanel: {
        width: '50%',
        background: 'linear-gradient(135deg, #FF00C7, #FF7A00)',
        borderRadius: '0px 0 0 10px',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },
      rightPanel: {
        width: '50%',
        textAlign: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },
      header: {
        marginBottom: '20px',
        fontSize: '25px',
        fontWeight: 'bold',
        color: '#8312A5'
      },
      paragraph: {
        fontSize: '16px',
        lineHeight: '1.5',
        textAlign: 'left'
      },
      form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      inputGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        width: '100%'
      },
      icon: {
        padding: '10px',
        background: '#FF7A00',
        borderRadius: '20px 0 0 20px',
        color: 'white'
      },
      input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '0 20px 20px 0',
        fontSize: '16px'
      },
      submitButton: {
        background: 'linear-gradient(135deg, #6B00FF, #FF005C)',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px'
      },
      submitButtonHover: {
        opacity: '0.9'
      }
    };

    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <div style={styles.leftPanel}>
            <h1>Welcome to Website ShoppingOnline</h1>
            <p style={styles.paragraph}>
            Hãy khám phá các danh mục sản phẩm đa dạng của chúng tôi, từ thời trang, điện tử, gia dụng, đến mỹ phẩm và nhiều hơn nữa. 
            Đừng quên đăng ký tài khoản để nhận ngay những ưu đãi đặc biệt và cập nhật những chương trình khuyến mãi hấp dẫn.</p>
          </div>
          <div style={styles.rightPanel}>
            <h2 style={styles.header}>SIGN-UP</h2>
            <form style={styles.form}>
              <div style={styles.inputGroup}>
                <span style={styles.icon}><FaUser /></span>
                <input
                  type="text"
                  value={this.state.txtUsername}
                  onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                  placeholder="Username"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <span style={styles.icon}><FaLock /></span>
                <input
                  type="password"
                  value={this.state.txtPassword}
                  onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
                  placeholder="Password"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <span style={styles.icon}><FaAddressCard /></span>
                <input
                  type="text"
                  value={this.state.txtName}
                  onChange={(e) => { this.setState({ txtName: e.target.value }) }}
                  placeholder="Name"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <span style={styles.icon}><FaPhone /></span>
                <input
                  type="tel"
                  value={this.state.txtPhone}
                  onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
                  placeholder="Phone"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <span style={styles.icon}><FaEnvelope /></span>
                <input
                  type="email"
                  value={this.state.txtEmail}
                  onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
                  placeholder="Email"
                  style={styles.input}
                />
              </div>
              <input
                type="submit"
                value="SIGN-UP"
                onClick={(e) => this.btnSignupClick(e)}
                style={styles.submitButton}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }

  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const account = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
      this.apiSignup(account);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }

  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Signup;
