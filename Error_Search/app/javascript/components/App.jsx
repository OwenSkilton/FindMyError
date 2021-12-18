import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import About from "./About";
import Home from "./Home";
import SearchPage from "./Search/SearchPage";
import ResultsIndex from "./Results/ResultsIndex";
import ProfileHome from "./Profile/ProfileHome";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"app-container"}>
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search/Search" element={<SearchPage />} />
                        <Route path="/about/About" element={<About />} />
                        <Route path="/results/ResultsPage" element={<ResultsIndex />} />
                        <Route path="/profile/Profile" element={<ProfileHome />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

// https://stackoverflow.com/questions/48497510/simple-conditional-routing-in-reactjs
// Route conditioning, if search is blank dont route