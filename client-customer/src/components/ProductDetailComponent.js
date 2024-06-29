import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    background: '#f0f0f0',
    minHeight: '65vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  productContainer: {
    display: 'flex',
    maxWidth: '800px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  },
  productImageContainer: {
    flex: '1',
    padding: '40px'
  },
  productImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease'
  },
  productDetails: {
    flex: '1',
    padding: '20px',
    textAlign: 'left'
  },
  detailRow: {
    marginBottom: '10px'
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px'
  },
  quantityInput: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '50px',
    textAlign: 'center',
    marginRight: '10px'
  },
  addToCartButton: {
    background: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none'
  },
  addToCartButtonHover: {
    backgroundColor: '#219653'
  },
  productTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    background: '-webkit-linear-gradient(#6B00FF, #00FF8E)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }
};

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  apiGetProduct(id) {
    axios.get(`/api/customer/products/${id}`).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }

  btnAdd2CartClick = (e) => {
    e.preventDefault();
    const { product, txtQuantity } = this.state;
    const quantity = parseInt(txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id);
      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Product added to cart successfully!');
    } else {
      alert('Please input quantity');
    }
  };

  render() {
    const prod = this.state.product;
    if (!prod) return null;

    return (
      <div style={styles.body}>
        <div className="product-container" style={styles.productContainer}>
          <div style={styles.productImageContainer}>
            <img src={`data:image/jpg;base64,${prod.image}`} alt={prod.name} style={styles.productImage} />
          </div>
          <div style={styles.productDetails}>
            <h2 className="text-center" style={styles.productTitle}>PRODUCT DETAILS</h2>
            <div style={styles.detailRow}>
              <span style={styles.label}>ID:</span>
              {prod._id}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Name:</span>
              {prod.name}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Price:</span>
              {prod.price}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Category:</span>
              {prod.category.name}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Quantity:</span>
              <input
                type="number"
                min="1"
                max="99"
                value={this.state.txtQuantity}
                onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }}
                style={styles.quantityInput}
              />
            </div>
            <div style={styles.detailRow}>
              <button
                type="submit"
                onClick={this.btnAdd2CartClick}
                style={styles.addToCartButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#219653'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetail);
