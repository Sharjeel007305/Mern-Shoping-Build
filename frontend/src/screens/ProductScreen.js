import './ProductScreen.css';
import { useParams,useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
//Actions
import {getProductsDetails} from "../redux/actions/productActions";
import {addToCart} from "../redux/actions/cartActions";

const  ProductScreen = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.getProductsDetails);
  const {loading, error, product} = productDetails;

  useEffect (()=>{
    dispatch(getProductsDetails(id))
  }, [dispatch, id]);
  
  const addToCartHandler = () => {
    const quantity = Number(qty);
    if (!quantity || quantity < 1) {
      setQty(1);
      return;
    }

    dispatch(addToCart({id:product._id, qty: quantity}));
    navigate("/cart") 
  }

  return (
  <div className="productscreen">
    {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> : (
      <>
      <div className="productscreen__left">
        <div className="left__image">
          <img 
          src={product.imageUrl} 
          alt= {product.name} 
          />
        </div>
        <div className="left__info">
          <p className="left__name">{product.name}</p>
          <p>Price: $ {product.price}</p>
          <p>Description: {product.description}</p>
          </div> 
        </div>
        <div className="productscreen__right">
        <div className="right__info">
          <p>
            Price : <span>${product.price}</span>
          </p>
          <p>
            Status : <span>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
          </p>
          <p>
            Qty
            <input
              className="qty__input"
              type="number"
              min="1"
              step="1"
              value={qty}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setQty("");
                  return;
                }
                const nextQty = Number(value);
                if (!Number.isNaN(nextQty) && nextQty >= 1) {
                  setQty(nextQty);
                }
              }}
              onBlur={() => {
                if (!qty || Number(qty) < 1) {
                  setQty(1);
                }
              }}
            />
          </p>
          <p>
            <button
              type="button"
              onClick={addToCartHandler}
              disabled={product.countInStock <= 0 || !qty || Number(qty) < 1}
            >
              Add to Cart
            </button>
          </p>
        </div>
        </div>

      </>
    ) }
       
        </div>
)}

export default ProductScreen