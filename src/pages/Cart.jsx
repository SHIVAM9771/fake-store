import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  remove,
  incrementQuantity,
  decrementQuantity,
} from '../store/cartSlice'; 
import './Cart.css'; 

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cartWrapper">
      <h1 className="cartTitle">Shopping Cart 🛒</h1>
      {cart.length === 0 ? (
        <div className="emptyCart">
          <p>Your cart is empty 😢</p>
          <a href="/" className="continueShopping">Continue Shopping</a>
        </div>
      ) : (
        <>
          <ul className="cartItems">
            {cart.map((item) => (
              <li className="cartItem" key={item.id}>
                <img src={item.image} alt={item.title} className="cartImage" />
                <div className="itemDetails">
                  <h4>{item.title}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className="quantityControl">
                    <button onClick={() => dispatch(decrementQuantity(item))}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item))}>
                      +
                    </button>
                  </div>
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="removeButton"
                    onClick={() => dispatch(remove(item))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cartTotal">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
