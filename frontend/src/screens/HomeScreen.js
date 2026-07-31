import './HomeScreen.css';
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Product from '../components/Product';
import { getProducts as listProducts, createProduct, deleteProduct } from "../redux/actions/productActions";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  countInStock: "",
  imageUrl: "",
};

const heroImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const getProducts = useSelector(state => state.getProducts);
  const { products, loading, error } = getProducts;

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [imageMode, setImageMode] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const searchQuery = useMemo(() => {
    return new URLSearchParams(location.search).get("q")?.trim().toLowerCase() || "";
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products || [];
    return (products || []).filter((product) =>
      [product.name, product.description]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(searchQuery))
    );
  }, [products, searchQuery]);

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const resetForm = () => {
    setFormData(emptyForm);
    setImageMode("url");
    setImageFile(null);
    setPreviewUrl("");
    setFormError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageModeChange = (mode) => {
    setImageMode(mode);
    setFormError("");
    if (mode === "url") {
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageFile(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFormError("Please choose an image file.");
      setImageFile(null);
      event.target.value = "";
      return;
    }

    setFormError("");
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (imageMode === "url" && !formData.imageUrl.trim()) {
      setFormError("Please enter an image URL.");
      return;
    }

    if (imageMode === "upload" && !imageFile) {
      setFormError("Please upload an image.");
      return;
    }

    setSaving(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("description", formData.description.trim());
      payload.append("price", formData.price);
      payload.append("countInStock", String(formData.countInStock));

      if (imageMode === "upload") {
        payload.append("image", imageFile);
      } else {
        payload.append("imageUrl", formData.imageUrl.trim());
      }

      await dispatch(createProduct(payload));
      resetForm();
    } catch (err) {
      setFormError(err.message || "Could not add product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    setDeletingId(productId);
    try {
      await dispatch(deleteProduct(productId));
    } catch (err) {
      window.alert(err.message || "Could not delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="homescreen">
      {!showForm && (
        <section className="hero page-shell">
          <h1>Step Into Style</h1>
          <p>
            Discover our latest collection of premium sneakers — comfort, design,
            and performance in every pair.
          </p>
          <div className="hero__gallery">
            {heroImages.map((src) => (
              <div className="hero__card" key={src}>
                <img src={src} alt="Featured sneaker style" />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="homescreen__content page-shell">
        <div className="homescreen__header">
          <h2 className="homescreen__title">
            {showForm ? "Add Product" : searchQuery ? `Results for "${searchQuery}"` : "Latest Products"}
          </h2>
          {showForm ? (
            <button
              type="button"
              className="homescreen__add-btn homescreen__add-btn--secondary"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
            >
              Back to Products
            </button>
          ) : (
            <button
              type="button"
              className="homescreen__add-btn"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              Add Product
            </button>
          )}
        </div>

        {showForm && (
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="product-form__heading">
              <h3>Add a new product</h3>
              <p>Fill in the details and it will show up under Latest Products.</p>
            </div>

            {formError && <p className="product-form__error">{formError}</p>}

            <div className="product-form__grid">
              <div className="product-form__field">
                <label htmlFor="product-name">Name</label>
                <input
                  id="product-name"
                  name="name"
                  type="text"
                  placeholder="Product name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="product-form__field">
                <label htmlFor="product-price">Price</label>
                <input
                  id="product-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="product-form__field">
                <label htmlFor="product-stock">Count in stock</label>
                <input
                  id="product-stock"
                  name="countInStock"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={formData.countInStock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="product-form__field product-form__field--full">
                <span className="product-form__label">Product image</span>
                <div className="product-form__image-toggle" role="group" aria-label="Image source">
                  <button
                    type="button"
                    className={imageMode === "url" ? "is-active" : ""}
                    onClick={() => handleImageModeChange("url")}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    className={imageMode === "upload" ? "is-active" : ""}
                    onClick={() => handleImageModeChange("upload")}
                  >
                    Image Upload
                  </button>
                </div>

                {imageMode === "url" ? (
                  <input
                    id="product-image"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="product-form__upload">
                    <input
                      ref={fileInputRef}
                      id="product-image-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="product-image-file" className="product-form__upload-btn">
                      Choose image
                    </label>
                    <span className="product-form__upload-name">
                      {imageFile ? imageFile.name : "No file selected"}
                    </span>
                  </div>
                )}

                {(imageMode === "url" && formData.imageUrl.trim()) || previewUrl ? (
                  <div className="product-form__preview">
                    <img
                      src={imageMode === "upload" ? previewUrl : formData.imageUrl.trim()}
                      alt="Product preview"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ) : null}
              </div>

              <div className="product-form__field product-form__field--full">
                <label htmlFor="product-description">Description</label>
                <textarea
                  id="product-description"
                  name="description"
                  rows="4"
                  placeholder="Describe the product"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="product-form__actions">
              <button
                type="button"
                className="product-form__cancel"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                disabled={saving}
              >
                Cancel
              </button>
              <button type="submit" className="product-form__submit" disabled={saving}>
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        )}

        {showForm && (
          <div className="manage-products">
            <div className="manage-products__heading">
              <h3>Added products</h3>
              <p>Manage products here with View and Delete.</p>
            </div>

            <div className="homescreen__products">
              {loading ? (
                <h2>Loading...</h2>
              ) : error ? (
                <h2>{error}</h2>
              ) : products?.length ? (
                products.map((product) => (
                  <Product
                    key={product._id}
                    productId={product._id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    showDelete
                    onDelete={handleDelete}
                    deleting={deletingId === product._id}
                  />
                ))
              ) : (
                <p className="homescreen__empty">No products added yet. Save a product to see it here.</p>
              )}
            </div>
          </div>
        )}

        {!showForm && (
          <div className="homescreen__products">
          { loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : filteredProducts.length ? (
            filteredProducts.map((product) => <Product
             key={product._id}
             productId={product._id}
             name={product.name}
             price={product.price}
             description={product.description}
             imageUrl={product.imageUrl}
            /> )
          ) : (
            <p className="homescreen__empty">
              {searchQuery
                ? "No products match your search."
                : "No products yet. Click Add Product to create one."}
            </p>
          )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeScreen;
