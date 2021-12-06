import React, {useState} from "react"
import SearchParams from "./SearchParams";
import {Link} from "react-router-dom";

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [languages, setLanguages] = useState([])
    const [response, setResponse] = useState([])

    const updateLanguages = (language) =>{
        let newLanguages = languages
        languages.indexOf(language) === -1 ? newLanguages.push(language) : newLanguages = languages.filter((languageInArray) => languageInArray !== language)
        setLanguages(newLanguages)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (

        <>
            <form className={"search__container"} onSubmit={handleSubmit}>
                <div className={"searchbar-outer-padding"}>
                <input
                    type="text"
                    id={"SearchBar"}
                    name={"SearchBar"}
                    placeholder={"search"}
                    className={"search__input"}
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <Link
                    to="/results/ResultsPage"
                    state={{
                        search: search,
                        languages: languages
                    }}
                >
                    <button className={"search-button"} type="submit"><i className="fa fa-search"></i></button>
                </Link>
                </div>
            </form>
            <div className={"search-checkboxes"}>
                <SearchParams updateLanguages={updateLanguages}/>
            </div>
        </>
    );
};

export default SearchBar;
