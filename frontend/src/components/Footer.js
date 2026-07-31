import "./Footer.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }
    setMessage("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="site-footer" id="contact">
      <section className="newsletter">
        <div className="page-shell newsletter__inner">
          <h2>Stay in the loop</h2>
          <p>
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            style inspiration.
          </p>
          <form className="newsletter__form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Email address"
            />
            <button type="submit" aria-label="Subscribe">
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>
          {message && <p className="newsletter__message">{message}</p>}
        </div>
      </section>

      <div className="footer-main page-shell">
        <div className="footer-brand">
          <Link to="/" className="footer-brand__logo">
            <span className="footer-brand__icon" aria-hidden="true">
              <i className="fas fa-shopping-bag"></i>
            </span>
            <h3>
              Shop<span>Hub</span>
            </h3>
          </Link>
          <p>
            Discover unique products that inspire your lifestyle. Quality
            craftsmanship meets modern design.
          </p>
          <ul className="footer-contact">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>123 ABC Street, Style City, SC 12345</span>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <span>+1 (000) 000-0000</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>hello@shophub.com</span>
            </li>
          </ul>
          <div className="footer-social">
            <a href="#facebook" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#twitter" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#instagram" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#pinterest" aria-label="Pinterest">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <Link to="/">All Products</Link>
            <Link to="/">New Arrivals</Link>
            <Link to="/">Sale</Link>
            <Link to="/">Featured</Link>
          </div>
          <div>
            <h4>Customer Care</h4>
            <a href="#contact">Contact Us</a>
            <a href="#contact">Help Center</a>
            <a href="#contact">Shipping Info</a>
            <a href="#contact">Returns & Exchanges</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#contact">About Us</a>
            <a href="#contact">Careers</a>
            <a href="#contact">Blog</a>
            <a href="#contact">Press</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms & Conditions</a>
            <a href="#contact">Cookie Policy</a>
            <a href="#contact">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
