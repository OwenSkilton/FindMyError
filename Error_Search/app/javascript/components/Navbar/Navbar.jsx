import React from 'react';
import '../../../assets/stylesheets/navbar.scss'

const Navbar = () => {
    return (
        <div className={"app-container"}>
            <nav className="page__menu menu">
                <ul className="menu__list r-list">
                    <li className="menu__group" onClick={()=>window.location.assign('/')}>
                        <a className="menu__link r-link text-underlined">Error Search</a>
                    </li>
                    <li className="menu__group" onClick={()=>window.location.assign('/search/Search')}>
                        <a className="menu__link r-link text-underlined">Search</a>
                    </li>
                    <li className="menu__group" onClick={()=>window.location.assign('/about/About')}>
                        <a className="menu__link r-link text-underlined">About</a>
                    </li>
                    <li className="menu__group" onClick={()=>window.location.assign('/profile/Profile')}>
                        <a className="menu__link r-link text-underlined">Profile</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

