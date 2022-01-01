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
                    <li className="menu__group" onClick={()=>window.location.assign('/users/sign_in')}>
                        <a className="menu__link r-link text-underlined">Sign in</a>
                    </li>
                    <li className="menu__group" onClick={()=>window.location.assign('/users/sign_up')}>
                        <a className="menu__link r-link text-underlined">Sign up</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

