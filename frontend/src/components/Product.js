import "./Product.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const Product = ({
  imageUrl,
  name,
  price,
  description,
  productId,
  onDelete,
  deleting,
  showDelete = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart({ id: productId, qty: 1 }));
    navigate("/cart");
  };

  return (
    <article className="product">
      <Link to={`/product/${productId}`} className="product__media">
        <img src={imageUrl} alt={name} />
      </Link>
      <div className="product__info">
        <Link to={`/product/${productId}`} className="info__name">
          {name}
        </Link>
        {showDelete && (
          <p className="info__description">
            {(description || "").substring(0, 90)}
            {(description || "").length > 90 ? "..." : ""}
          </p>
        )}
        <p className="info__price">${Number(price).toFixed(2)}</p>
        <div className="product__actions">
          {showDelete ? (
            <>
              <Link to={`/product/${productId}`} className="info__button">
                View
              </Link>
              <button
                type="button"
                className="info__delete"
                onClick={() => onDelete?.(productId)}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </>
          ) : (
            <button type="button" className="info__cart" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Product;
