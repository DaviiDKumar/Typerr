// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleAuthClick = () => {
        setIsLoggedIn(prev => !prev);
    };

    return (
        <nav className="sidebar">
            <div className='nav-content'>
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
        </nav>
    );
}

export default Navbar;
