import React from 'react';
import {Link} from "react-router-dom";
import '../../../assets/stylesheets/Navbar.scss'

const Navbar = () => {
    return (
        <>
            <nav className="page__menu menu">
                <ul className="menu__list r-list">
                    <li className="menu__group">
                        <Link to={"/"} className="menu__link r-link text-underlined">ErrorSearch</Link>
                    </li>
                    <li className="menu__group">
                        <Link to={"/search/Search"} className="menu__link r-link text-underlined">Search</Link>
                    </li>
                    <li className="menu__group">
                        <Link to={"/about/About"} className="menu__link r-link text-underlined">About</Link>
                    </li><li className="menu__group">
                        <Link to={"/profile/Profile"} className="menu__link r-link text-underlined">Account</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;

