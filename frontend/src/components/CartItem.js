import './CartItem.css';
import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  const quantity = Number(item.qty) || 1;
  const updateQuantity = (nextQuantity) => {
    qtyChangeHandler(item.product, Math.max(1, nextQuantity));
  };

  return (
    <div className="cartitem">
        <Link to={`/product/${item.product}`} className="cartitem__image">
          <img src={item.imageUrl} alt={item.name} />
        </Link>
        <div className="cartitem__details">
          <Link to={`/product/${item.product}`} className="cartitem__name">
            {item.name}
          </Link>
          <p>${Number(item.price).toFixed(2)} each</p>
          <div className="cartitem__quantity" aria-label={`Quantity for ${item.name}`}>
            <button
              type="button"
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) => updateQuantity(Number(event.target.value) || 1)}
              aria-label="Quantity"
            />
            <button
              type="button"
              onClick={() => updateQuantity(quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        <strong className="cartitem__total">
          ${(Number(item.price) * quantity).toFixed(2)}
        </strong>
        <button
          type="button"
          className="cartitem__deleteBtn"
          onClick={() => removeHandler(item.product)}
          aria-label={`Remove ${item.name}`}
        >
          <i className="fas fa-trash"></i>
        </button>
    </div>
  );
};

export default CartItem;
