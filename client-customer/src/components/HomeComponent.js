import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      banners: [
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/22/laptop-amd-1200x375.png",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/27/web-huawel-fit-3-web.jpg",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/08/xiaomi-redmi-12-web.png",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/28/s24-ultra-1200x375_638551915514340880.jpg",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/06/ocal-tiger-1200x375.png",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/14/tecno-camon-30-1200x375.jpg",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/20/honor-x7b-1200x375.jpg",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/26/1200x375.png",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/17/1200x375-msi-150624.png",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/06/06/sennheiser-1200x375.jpg",
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/05/30/xiaomi-14-1200-x-375.jpg"
      ]
    };

    // Bind the method to this
    this.topFunction = this.topFunction.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = this.scrollFunction;
  }

  // APIs
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }

  // Show or hide the button based on scroll position
  scrollFunction() {
    const mybutton = document.getElementById("backToTopBtn");
    if (mybutton) { // Check if mybutton exists
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    const newprods = this.state.newprods.map((item) => (
      <div key={item._id} className="product-card inline">
        <figure>
          <Link to={'/product/' + item._id}>
            <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
          </Link>
          <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption>
        </figure>
      </div>
    ));

    const hotprods = this.state.hotprods.map((item) => (
      <div key={item._id} className="product-card inline">
        <figure>
          <Link to={'/product/' + item._id}>
            <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
          </Link>
          <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption>
        </figure>
      </div>
    ));

    return (
      <div>
        <style>{`
          .align-center {
            padding: 20px;
            margin: 20px auto;
            max-width: 1200px;
          }

          .new-products {
            background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            animation: backgroundShift 5s ease infinite;
          }

          .hot-products {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            animation: backgroundShift 5s ease infinite;
          }

          @keyframes backgroundShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .banner-container img {
            width: 100%;
            height: auto;
            border-radius: 10px;
          }

          #backToTopBtn {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 30px;
            z-index: 99;
            font-size: 18px;
            border: none;
            outline: none;
            background-color: #555;
            color: white;
            cursor: pointer;
            padding: 15px;
            border-radius: 10px;
          }

          #backToTopBtn:hover {
            background-color: #333;
          }

          .social-sidebar {
            position: fixed;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 10px;
            border-radius: 0 10px 10px 0;
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
          }
          .gradient-text {
          background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          font-size: 3em;
          text-align: center;
          animation: gradientShift 8s ease-in-out infinite, blink 1s step-start infinite;
          }

          @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
          }

        @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
        }
        .product-card {
        transition: transform 0.3s, box-shadow 0.3s;
        border-radius: 10px;
        overflow: hidden;
        }

        .product-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .product-card img {
        border-radius: 10px 10px 0 0;
        }

        .product-card figcaption {
        padding: 10px;
        background-color: #fff;
        text-align: center;
        }


        `}</style>

        <div className="banner-container">
          <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false} showArrows>
            {this.state.banners.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`Banner ${index + 1}`} className="img-responsive" />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="align-center new-products">
          <h2 className="gradient-text">NEW PRODUCTS</h2>
          {newprods}
        </div>

        {this.state.hotprods.length > 0 ? (
          <div className="align-center hot-products">
            <h2 className="gradient-text">HOT PRODUCTS</h2>
            {hotprods}
          </div>
        ) : (
          <div />
        )}
              {/* New section for iPhone 15 series */}
              <div class="wrapper">
  <div class="iphone-15-section">
    <h2>IPHONE 15 SERIES TRẢ GÓP TỪ 69K/NGÀY</h2>
    <div class="iphone-15-banner">
      <img src="https://images.fpt.shop/unsafe/fit-in/1168x97/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/5/31/638527770084438026_H7-%201200x100.png" alt="iPhone 15 Series Banner" />
    </div>
    <div class="iphone-15-products">
      <div class="product">
        <img src="https://images.fpt.shop/unsafe/fit-in/262x324/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/5/31/638527770084594737_banner.png" alt="iPhone 15 Pro Max" />
      </div>
      <div class="product">
        <img src="https://images.fpt.shop/unsafe/fit-in/262x324/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/5/31/638527770081774150_banner-1.png" alt="iPhone 15 Pro" />
      </div>
      <div class="product">
        <img src="https://images.fpt.shop/unsafe/fit-in/262x324/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/5/31/638527770083501340_banner-2.png" alt="iPhone 15 Plus" />
      </div>
      <div class="product">
        <img src="https://images.fpt.shop/unsafe/fit-in/262x324/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/5/31/638527770083813190_banner-3.png" alt="iPhone 15" />
      </div>
    </div>
  </div>
</div>



        <div className="social-sidebar">
          <a href="https://www.facebook.com/ntruong.1103" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=48&id=118497&format=png" alt="Facebook" />
          </a>
          <a href="https://www.youtube.com/channel/UCWG0nL3P3FtL7T0IESgFdaQ" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=48&id=19318&format=png" alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/ntruong.1103/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=64&id=119026&format=png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@jaji.z" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=50&id=118638&format=png" alt="TikTok" />
          </a>
          <a href="https://zalo.me/0348177164" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=48&id=0m71tmRjlxEe&format=png" alt="Zalo" />
          </a>
        </div>

        <button onClick={this.topFunction} id="backToTopBtn" title="Go to top">
          <img src="https://24hstore.vn/images/back.svg" alt="Go to top" style={{ width: '24px', height: '24px' }} />
          <div>Quay về đầu trang</div>
        </button>
      </div>

    );
  }
}

export default Home;
