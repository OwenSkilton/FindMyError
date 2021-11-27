import React, {useState} from "react"
import SearchBar from "./SearchBar";
class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <SearchBar/>
            </>
        )
    }
}

export default Home
