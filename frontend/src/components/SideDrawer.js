import './SideDrawer.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const SideDrawer = ({show, click}) => {
    const sideDrawerClass = ["sidedrawer"]
    if(show) {
        sideDrawerClass.push("show")     
    }

    const navigate = useNavigate();
    const location = useLocation();
    const [Username, setUsername] = useState("");
    const [search, setSearch] = useState("");
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    useEffect(() => {
      setUsername(localStorage.getItem("UserName") || "");
      setSearch(new URLSearchParams(location.search).get("q") || "");
    }, [location.pathname, location.search, show]);
  
    const getCartCount = () => {
      return cartItems.reduce((qty,item) => qty + Number(item.qty), 0);
    }

    const handleLogout = () => {
      localStorage.removeItem("UserName");
      setUsername("");
      click?.();
      navigate("/login");
    };

    const handleSearch = (event) => {
      event.preventDefault();
      const query = search.trim();
      click?.();
      navigate(query ? `/?q=${encodeURIComponent(query)}` : "/");
    };

  return  <div className={sideDrawerClass.join(" ")}>
    <ul className="sidedrawer__links">
        <li className="sidedrawer__search-item">
          <form className="sidedrawer__search" onSubmit={handleSearch}>
            <i className="fas fa-search"></i>
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>
        </li>
        <li>
            {Username ? (
              <button type="button" className="sidedrawer__user" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout ({Username})</span>
              </button>
            ) : (
              <>
                <Link to="/login" onClick={click}>
                    <i className="fas fa-user"></i>
                    <span>Sign In</span>
                </Link>
              </>
            )}
        </li>
        {!Username && (
          <li>
            <Link to="/SignUpReg" onClick={click}>
              <i className="fas fa-user-plus"></i>
              <span>Sign Up</span>
            </Link>
          </li>
        )}
        <li>
            <Link to="/cart" onClick={click}>
        <i className="fas fa-shopping-cart"></i>
        <span>
            Cart <span className="sidedrawer__cartbadge">{getCartCount()}</span>
        </span>
        </Link>
        </li>
        <li>
            <Link to="/" onClick={click}>Shop</Link>
        </li>
        <li>
            <a href="#contact" onClick={click}>Contact</a>
        </li>
    </ul>
  </div>
  
};

export default SideDrawer
