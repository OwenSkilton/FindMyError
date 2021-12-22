import React from 'react';
import '../../../assets/stylesheets/navbar.scss'

const Navbar = () => {
    return (
        <>
            <nav className="page__menu menu">
                <ul className="menu__list r-list">
                    <li className="menu__group" onClick={()=>window.location.assign('/')}>
                        <label className="menu__link r-link text-underlined">Error Search</label>
                    </li>
                    <li className="menu__group" onClick={()=>window.location.assign('/search/Search')}>
                        <label className="menu__link r-link text-underlined">Search</label>
                    </li>
                    <li className="menu__group" onClick={()=>window.location.assign('/about/About')}>
                        <label className="menu__link r-link text-underlined">About</label>
                    </li>
                    <li className="menu__group" onClick={()=>window.location.assign('/profile/Profile')}>
                        <label className="menu__link r-link text-underlined">Profile</label>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;

