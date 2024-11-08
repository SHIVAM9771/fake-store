import React, { useState, useEffect } from "react";
import "./Product.css";
import { add } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";

function Product() {
  const dispatch = useDispatch();
  //   const [loading, setLoading] = useState(true);
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
    // setLoading(false);
    // const fetchProduct = async () => {
    //   try {
    //     const res = await fetch("https://fakestoreapi.com/products");
    //     const data = await res.json();
    //     setProducts(data);
    //   } catch (error) {
    //     console.error("Error fetching products:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchProduct();
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
    // alert("Product added to cart!");
  };

  // Loading state rendering
  if (status === STATUSES.LOADING) {
    return (
      <div className="spinnerWrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error handling (optional)
  if (status === STATUSES.ERROR) {
    return <div>Error fetching products. Please try again later.</div>;
  }

  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img
            src={product.image}
            alt={product.title}
            className="productImage"
          />
          <div className="cardContent">
            <h4 className="productTitle">{product.title}</h4>
            <p className="productCategory">Category: {product.category}</p>
            <p className="productDescription">{product.description}</p>
            <div className="productRating">
              <span>⭐ {product.rating.rate}</span>
              <span>({product.rating.count} reviews)</span>
            </div>
            <h5 className="productPrice">${product.price.toFixed(2)}</h5>
            <button
              className="addToCartButton btn"
              onClick={() => handleAdd(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
