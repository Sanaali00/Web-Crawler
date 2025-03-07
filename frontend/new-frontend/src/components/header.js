import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h1>Web Crawler</h1>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/dashboard">Dashboard</Link> |
                <Link to="/settings">Settings</Link>
            </nav>
        </header>
    );
};

export default Header;
