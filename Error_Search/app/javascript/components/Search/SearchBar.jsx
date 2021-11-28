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
            <form onSubmit={handleSubmit}>
                <div className={"search__container"}>
                <input
                    type="text"
                    id={"SearchBar"}
                    name={"SearchBar"}
                    placeholder={"search"}
                    className={"search__input"}
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                </div>
                <Link
                    to="/results/ResultsPage"
                    state={{
                        search: search,
                        languages: languages
                    }}
                >
                    <button type="submit"><i className="fa fa-search"></i></button>
                </Link>
            </form>
            <br/>
            <SearchParams updateLanguages={updateLanguages}/>
        </>
    );
};

export default SearchBar;
