import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    background: '#f0f0f0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
  },
  productList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '20px'
  },
  productCard: {
    position: 'relative',
    width: '300px',
    height: '400px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  },
  productImage: {
    width: '100%',
    height: 'auto',
    transition: 'transform 0.3s ease'
  },
  productDetails: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    boxSizing: 'border-box',
    borderTop: '1px solid #ccc',
    transition: 'transform 0.3s ease'
  },
  productName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    transition: 'color 0.3s ease'
  },
  productPrice: {
    textAlign: 'center',
    marginTop: '5px',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease'
  },
  buyNowButton: {
    display: 'block',
    width: '25%',
    textAlign: 'center',
    marginTop: '0px',
    padding: '0px',
    backgroundColor: 'red',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer'
  },
  sortBy: {
    marginBottom: '20px'
  },
  selectBox: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  listProducts: {
    background: '-webkit-linear-gradient(left, violet, indigo, blue, green, yellow, orange, red)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '20px'
  }
};

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sort: "default",
    };

    this.topFunction = this.topFunction.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }

    window.addEventListener('scroll', this.scrollFunction);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction);
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  cmbSortChange(sort) {
    const sortedProducts = [...this.state.products];
    if (sort === 'nameASC') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'nameDESC') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'priceASC') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceDESC') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    this.setState({ products: sortedProducts, sort });
  }

  scrollFunction() {
    const mybutton = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  handleMouseEnter(index) {
    const products = [...this.state.products];
    products[index].hovered = true;
    this.setState({ products });
  }

  handleMouseLeave(index) {
    const products = [...this.state.products];
    products[index].hovered = false;
    this.setState({ products });
  }

  render() {
    const { products, sort } = this.state;

    return (
      <div style={styles.body}>
        <h2 className="text-center" style={styles.listProducts}>LIST PRODUCTS</h2>
        <div style={styles.sortBy}>
          <select
            value={sort}
            onChange={(e) => { this.cmbSortChange(e.target.value); }}
            style={styles.selectBox}
          >
            <option value="default">------ Sort by ------</option>
            <option value="nameASC">Name (a &#8594; z)</option>
            <option value="nameDESC">Name (z &#8594; a)</option>
            <option value="priceASC">Price (low &#8594; high)</option>
            <option value="priceDESC">Price (high &#8594; low)</option>
          </select>
        </div>
        <div style={styles.productList}>
          {products.map((item, index) => (
            <div
              key={item._id}
              className="product-card"
              style={{
                ...styles.productCard,
                transform: item.hovered ? 'scale(1.1)' : 'scale(1)'
              }}
              onMouseEnter={() => this.handleMouseEnter(index)}
              onMouseLeave={() => this.handleMouseLeave(index)}
            >
              <Link to={`/product/${item._id}`}>
                <img
                  src={`data:image/jpg;base64,${item.image}`}
                  alt={item.name}
                  style={styles.productImage}
                />
                <div className="product-details" style={styles.productDetails}>
                  <div className="product-name" style={styles.productName}>
                    {item.name}
                  </div>
                  <div className="product-price" style={styles.productPrice}>
                    Price: {item.price}
                  </div>
                </div>
              </Link>
              <Link to={`/product/${item._id}`} style={styles.buyNowButton}>
                Buy Now
              </Link>
            </div>
          ))}
        </div>

        {/* Back to top button */}
        <button onClick={this.topFunction} id="backToTopBtn" title="Go to top">
          <img src="https://24hstore.vn/images/back.svg" alt="Go to top" style={{ width: '24px', height: '24px' }} />
          <div>Quay về đầu trang</div>
        </button>
      </div>
    );
  }
}

export default withRouter(Product);
