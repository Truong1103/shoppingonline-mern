import React, { Component } from 'react';

class Gmap extends Component {
  constructor(props) {
    super(props);
    this.topFunction = this.topFunction.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollFunction);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction);
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

  render() {
    return (
      <div className="align-center">
        <h2 className="text-center text-animation">MY LOCATION</h2>
        <iframe
          title='gmap'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7878741521376!2d106.69744041158101!3d10.827539189279799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2sVan%20Lang%20University%20-%20Campus%203!5e0!3m2!1sen!2s!4v1699933485961!5m2!1sen!2s"
          width="800"
          height="600"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <button onClick={this.topFunction} id="backToTopBtn" title="Go to top">
          <img src="https://24hstore.vn/images/back.svg" alt="Go to top" style={{ width: '24px', height: '24px' }} />
          <div>Quay về đầu trang</div>
        </button>
      </div>
    );
  }
}

export default Gmap;
