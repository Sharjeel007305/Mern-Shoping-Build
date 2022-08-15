import  "./Navbar.css";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = ({click}) => {
  const [Username,setuserName] = useState("");
  
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  useEffect(()=>{
    setuserName(localStorage.getItem("UserName") )

  }, [])
  const getCartCount = () => {
    return cartItems.reduce((qty,item) => qty + Number(item.qty), 0);
  }
  return (
    <nav className= "navbar">
      <div className="navbar__logo">
      <h2 className=""> MERN Shopping Cart</h2>
      </div>
      <ul className="navbar__links">    
      <li>
      <Link  to="/login" className="navbar__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Login
            </span>
          </Link>
        </li>  
        {Username && 
       <li >
          <Link  to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart
              <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
              
          </Link>
      </li>
}
    {Username && 
        <li >
          <Link to="/" className="">
            Shop
            </Link>
        </li>
}
      </ul>
      
  <div className="hamburger__menu" onClick={click}>
  <div></div>
  <div></div>
  <div></div>
  </div>
    </nav>
  );
};

export default Navbar;