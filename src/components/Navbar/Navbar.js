import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    return (
        <div className="Navbar">
            <NavLink exact to="/" activeClassName="Navbar-active">
                Home
            </NavLink>
            <NavLink to="/users" activeClassName="Navbar-active">
                Users
            </NavLink>
        </div>
    );
};

export default Navbar;
