import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    background: '#f2f2f2',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  orderListContainer: {
    width: '80%',
    margin: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto'
  },
  orderDetailContainer: {
    width: '80%',
    margin: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginTop: '30px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    background: '#007bff',
    color: '#ffffff',
    textAlign: 'center',
    transition: 'background-color 0.3s ease'
  },
  tableRow: {
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'center'
  },
  tableCellImage: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  detailHeader: {
    marginBottom: '10px',
    fontSize: '22px',
    color: '#007bff',
    textAlign: 'center',
    transition: 'color 0.3s ease'
  },
  // Màu nền cho trạng thái APPROVED và PENDING
  statusApproved: {
    backgroundColor: '#28a745', // Màu xanh lá cho APPROVED
    color: '#ffffff' // Màu chữ trắng
  },
  statusPending: {
    backgroundColor: '#dc3545', // Màu đỏ cho PENDING
    color: '#ffffff' // Màu chữ trắng
  },
};

class Myorders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/customer/orders/customer/${cid}`, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    
    const orders = this.state.orders.map((item) => (
      <tr key={item._id} className="datatable" style={styles.tableRow} onClick={() => this.trItemClick(item)}>
        <td style={styles.tableCell}>{item._id}</td>
        <td style={styles.tableCell}>{new Date(item.cdate).toLocaleString()}</td>
        <td style={styles.tableCell}>{item.customer.name}</td>
        <td style={styles.tableCell}>{item.customer.phone}</td>
        <td style={styles.tableCell}>{item.total}</td>
        <td style={item.status === 'APPROVED' ? styles.statusApproved : styles.statusPending}>{item.status}</td>
      </tr>
    ));

    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => (
        <tr key={item.product._id} className="datatable" style={styles.tableRow}>
          <td style={styles.tableCell}>{index + 1}</td>
          <td style={styles.tableCell}>{item.product._id}</td>
          <td style={styles.tableCell}>{item.product.name}</td>
          <td style={styles.tableCellImage}>
            <img src={`data:image/jpg;base64,${item.product.image}`} width="70px" height="70px" alt="" />
          </td>
          <td style={styles.tableCell}>{item.product.price}</td>
          <td style={styles.tableCell}>{item.quantity}</td>
          <td style={styles.tableCell}>{item.product.price * item.quantity}</td>
        </tr>
      ));
    }

    return (
      <div style={styles.body}>
        <div style={styles.orderListContainer}>
          <h2 className="text-center" style={styles.detailHeader}>ORDER LIST</h2>
          <table style={styles.table} border="1">
            <thead>
              <tr style={styles.tableHeader}>
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust. name</th>
                <th>Cust. phone</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order &&
          <div style={styles.orderDetailContainer}>
            <h2 style={styles.detailHeader}>ORDER DETAIL</h2>
            <table style={styles.table} border="1">
              <thead>
                <tr style={styles.tableHeader}>
                  <th>No.</th>
                  <th>Prod. ID</th>
                  <th>Prod. name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}

export default Myorders;
