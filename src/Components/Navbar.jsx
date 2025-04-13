import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleAuthClick = () => {
        setIsLoggedIn((prev) => !prev);
    };

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="nav-content">
                <div className="logo">
                    <h1>Typerr</h1>
                </div>

                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <button className="auth-button" onClick={handleAuthClick}>
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" onClick={handleAuthClick}>Login</Link>
                        )}
                    </li>
                </ul>
            </div>

            {/* Hamburger Button */}
            <div className="hamburger" onClick={toggleSidebar}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    );
}

export default Navbar;
