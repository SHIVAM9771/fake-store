import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
    const items = useSelector((state) => state.cart);
    const [isMobile, setIsMobile] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Toggle the mobile menu
    const toggleMenu = () => {
        setIsMobile(!isMobile);
    };

    // Handle scroll effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    // Listen to scroll events
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`navbar ${scrolled ? 'scroll' : ''}`}>
            <Link to="/" className="logo">REDUX STORE</Link>
            <div className={`navLinks ${isMobile ? 'mobile' : ''}`}>
                <NavLink className="navLink" to="/" exact activeClassName="active">
                    <i className="fas fa-home"></i> Home
                </NavLink>
                <NavLink className="navLink" to="/cart" activeClassName="active">
                    <i className="fas fa-shopping-cart"></i> Cart
                    {items.length > 0 && (
                        <span className="cartCount">{items.length}</span>
                    )}
                </NavLink>
                <Link className="navLink" to="/login">
                    <i className="fas fa-user"></i> Login
                </Link>
            </div>
            <div className={`hamburger ${isMobile ? 'active' : ''}`} onClick={toggleMenu}>
                <i className={`fas ${isMobile ? 'fa-times' : 'fa-bars'}`}></i>
            </div>
        </div>
    );
};

export default Navbar;
