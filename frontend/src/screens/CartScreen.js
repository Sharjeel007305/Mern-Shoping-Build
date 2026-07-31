import "./CartScreen.css";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CartItem from '../components/CartItem';
import { addToCart, clearCart, removeFromCart } from '../redux/actions/cartActions';

const CartScreen = () => {
  const dispatch = useDispatch();
  const [showBill, setShowBill] = useState(false);

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart({id, qty}));
  }

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const getCartCount = () => {
    return cartItems.reduce((qty,item) => Number(item.qty) + qty, 0);
  }

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => (item.price * item.qty) + price, 0);
  }

  const subtotal = getCartSubTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    setShowBill(true);
  };

  return (
    <>
      <section className="cart-page page-shell">
        <header className="cart-page__header">
          <div>
            <h1>Shopping Cart</h1>
            <p>
              {getCartCount()} {getCartCount() === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Link to="/" className="cart-page__continue">
            <i className="fas fa-arrow-left"></i>
            Continue Shopping
          </Link>
        </header>

        <div className="cartscreen">
          <div className="cartscreen__left">
            <div className="cart-card__header">
              <h2>Cart Items</h2>
              {cartItems.length > 0 && (
                <button
                  type="button"
                  className="cart-card__clear"
                  onClick={() => dispatch(clearCart())}
                >
                  <i className="far fa-trash-alt"></i>
                  Clear All
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <i className="fas fa-shopping-bag"></i>
                <h3>Your cart is empty</h3>
                <p>Browse our collection and find something you love.</p>
                <Link to="/">Start Shopping</Link>
              </div>
            ) : cartItems.map(
              item => (
                <CartItem
                  key={item.product}
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={removeHandler}
                />)
            )}
          </div>

          <aside className="cartscreen__right">
            <h2>Order Summary</h2>
            <div className="cartscreen__info">
              <p>
                <span>Subtotal ({getCartCount()} items)</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </p>
              <p>
                <span>Shipping</span>
                <span className="summary__free">Free</span>
              </p>
              <p>
                <span>Tax</span>
                <strong>${tax.toFixed(2)}</strong>
              </p>
            </div>
            <div className="cartscreen__total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button
              type="button"
              className="cartscreen__checkout"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              <i className="far fa-credit-card"></i>
              Proceed to Checkout
            </button>
            <ul className="checkout-benefits">
              <li>
                <i className="fas fa-shield-alt"></i>
                Secure SSL checkout
              </li>
              <li>
                <i className="fas fa-truck"></i>
                Free returns within 30 days
              </li>
              <li>
                <i className="far fa-heart"></i>
                24/7 customer support
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {showBill && (
        <div className="bill-modal" role="dialog" aria-modal="true" aria-labelledby="bill-title">
          <div className="bill-modal__backdrop" onClick={() => setShowBill(false)} />
          <div className="bill-modal__panel">
            <p className="bill-modal__preview-label">Bill preview</p>
            <div className="bill-modal__header">
              <div>
                <p className="bill-modal__eyebrow">ShopHub</p>
                <h2 id="bill-title">Order Bill</h2>
              </div>
              <button
                type="button"
                className="bill-modal__close"
                onClick={() => setShowBill(false)}
                aria-label="Close bill"
              >
                ×
              </button>
            </div>

            <div className="bill-modal__meta">
              <span>Date: {new Date().toLocaleString()}</span>
              <span>Items: {getCartCount()}</span>
            </div>

            <table className="bill-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>${Number(item.price).toFixed(2)}</td>
                    <td>${(Number(item.price) * Number(item.qty)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="bill-modal__summary">
              <div>
                <span>Subtotal</span>
                <strong>${getCartSubTotal().toFixed(2)}</strong>
              </div>
              <div>
                <span>Tax</span>
                <strong>${tax.toFixed(2)}</strong>
              </div>
              <div className="bill-modal__grand-total">
                <span>Grand Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            <div className="bill-modal__footer">
              <strong>Thank you for shopping with us!</strong>
              <span>This slip is your order summary.</span>
            </div>

            <div className="bill-modal__actions">
              <button type="button" className="bill-modal__secondary" onClick={() => setShowBill(false)}>
                Close
              </button>
              <button
                type="button"
                className="bill-modal__primary"
                onClick={() => window.print()}
              >
                Print Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartScreen
