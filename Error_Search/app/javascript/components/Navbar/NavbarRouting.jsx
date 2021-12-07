import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Navbar from "./Navbar";
import About from "../About";
import Home from "../Home";
import SearchBar from "../Search/SearchBar";
import ResultsIndex from "../Results/ResultsIndex";
import ProfileHome from "../Profile/ProfileHome";

const NavbarRouting = () => {
    return (
        <div className={"app-container"}>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search/Search" element={<SearchBar />} />
                    <Route path="/about/About" element={<About />} />
                    <Route path="/results/ResultsPage" element={<ResultsIndex />} />
                    <Route path="/profile/Profile" element={<ProfileHome />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default NavbarRouting;