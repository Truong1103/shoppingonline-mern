import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu">
          <Link to={'/product/category/' + item._id} className="styled-link">{item.name}</Link>
        </li>
      );
    });

    return (
      <div className="border-bottom menu-container">
        <ul className="menu">
          <li className="menu">
            <Link to='/' className="styled-link">
              Home
            </Link>
          </li>
          {cates}
          <li className="menu">
            <Link to='/gmap' className="styled-link">MAPS</Link>
          </li>
        </ul>
        <form className="search">
          <input
            type="search"
            placeholder="What do you need today?"
            className="keyword"
            value={this.state.txtKeyword}
            onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }}
          />
          <input
            type="submit"
            value="SEARCH"
            onClick={(e) => this.btnSearchClick(e)}
            className="styled-link"
          />
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default withRouter(Menu);
