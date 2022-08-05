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

  useEffect(()=> {
    // if(product && match.id !== product._id) {

      // dispatch(getProductsDetails(id))
    // }
  }, [dispatch, product]);

  useEffect (()=>{
    dispatch(getProductsDetails(id))
  },[id]);
  
  const addToCartHandler = () => {
    dispatch(addToCart({id:product._id,qty}));
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
            <select value={qty} onChange={(e)=> setQty(e.target.value)}>
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x+1}>
                  {x + 1}
                  </option>
              ))}
              </select>
          </p>
          <p>
            <button type="button" onClick={addToCartHandler}> Add to Cart</button>
          </p>
        </div>
        </div>

      </>
    ) }
       
        </div>
)}

export default ProductScreen