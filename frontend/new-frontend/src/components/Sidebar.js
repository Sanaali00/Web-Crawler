import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside>
            <h3>Navigation</h3>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
