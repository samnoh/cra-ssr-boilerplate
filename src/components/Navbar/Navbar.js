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
            <NavLink to="/posts" activeClassName="Navbar-active">
                Posts
            </NavLink>
        </div>
    );
};

export default Navbar;
