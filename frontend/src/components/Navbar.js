import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ click }) => {
  const [Username, setuserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    setuserName(localStorage.getItem("UserName") || "");
    setMenuOpen(false);
    const params = new URLSearchParams(location.search);
    setSearch(params.get("q") || "");
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("UserName");
    setuserName("");
    setMenuOpen(false);
    navigate("/login");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/?q=${encodeURIComponent(query)}` : "/");
  };

  return (
    <header className="navbar">
      <div className="navbar__inner page-shell">
        <div className="navbar__left">
          <Link to="/" className="navbar__logo">
            <span className="navbar__brand-icon" aria-hidden="true">
              <i className="fas fa-shopping-bag"></i>
              <i className="fas fa-arrow-pointer"></i>
            </span>
            <h2>
              Shop<span>Hub</span>
            </h2>
          </Link>
          <a href="#contact" className="navbar__nav-link">
            Contact
          </a>
        </div>

        <form className="navbar__search" onSubmit={handleSearch} role="search">
          <i className="fas fa-search" aria-hidden="true"></i>
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
        </form>

        <div className="navbar__actions">
          <Link to="/cart" className="navbar__icon-btn" aria-label="Cart">
            <i className="fas fa-shopping-cart"></i>
            {getCartCount() > 0 && (
              <span className="navbar__cart-badge">{getCartCount()}</span>
            )}
          </Link>

          {Username ? (
            <div className="navbar__user-menu" ref={menuRef}>
              <button
                type="button"
                className="navbar__user-btn"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <span className="navbar__username">{Username}</span>
                <i className={`fas fa-chevron-${menuOpen ? "up" : "down"}`}></i>
              </button>
              {menuOpen && (
                <div className="navbar__dropdown">
                  <button
                    type="button"
                    className="navbar__dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar__signin">
                Sign In
              </Link>
              <Link to="/SignUpReg" className="navbar__signup">
                Sign Up
              </Link>
            </>
          )}

          <button
            type="button"
            className="hamburger__menu"
            onClick={click}
            aria-label="Open menu"
          >
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
