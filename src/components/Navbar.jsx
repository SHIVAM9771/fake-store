import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css'; // Make sure to import the CSS file

const Navbar = () => {
    const items = useSelector((state) => state.cart);

    return (
        <div className="navbar">
            <span className="logo">REDUX STORE</span>
            <div className="navLinks">
                <Link className="navLink" to="/">
                    <i className="fas fa-home"></i> {/* Home Icon */}
                    Home
                </Link>
                <Link className="navLink" to="/cart">
                    <i className="fas fa-shopping-cart"></i> {/* Cart Icon */}
                    Cart
                </Link>
                <span className="cartCount">Cart items: {items.length}</span>
            </div>
        </div>
    );
};

export default Navbar;
