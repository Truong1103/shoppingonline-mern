import axios from 'axios';
import React, { Component } from 'react';
import { FaIdBadge, FaKey } from 'react-icons/fa';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }

  render() {
    const styles = {
      body: {
        margin: 0,
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url("https://cdn.gravity-global.com/production/active_background_1cd7d8d209.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '65vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      },
      container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        width: '400px',
        maxWidth: '100%',
        textAlign: 'center'
      },
      header: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#FF7A00'
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
        border: 'none',
        borderRadius: '0 20px 20px 0',
        fontSize: '16px',
        outline: 'none'
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
      }
    };

    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <h2 style={styles.header}>ACTIVE ACCOUNT</h2>
          <form style={styles.form}>
            <div style={styles.inputGroup}>
              <span style={styles.icon}><FaIdBadge /></span>
              <input
                type="text"
                value={this.state.txtID}
                onChange={(e) => { this.setState({ txtID: e.target.value }) }}
                placeholder="ID"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <span style={styles.icon}><FaKey /></span>
              <input
                type="text"
                value={this.state.txtToken}
                onChange={(e) => { this.setState({ txtToken: e.target.value }) }}
                placeholder="Token"
                style={styles.input}
              />
            </div>
            <input
              type="submit"
              value="ACTIVE"
              onClick={(e) => this.btnActiveClick(e)}
              style={styles.submitButton}
            />
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }

  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Active;
