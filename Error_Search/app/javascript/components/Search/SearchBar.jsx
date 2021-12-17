import React, {useState} from "react"
import {Link} from "react-router-dom";
import RenderFrameworks from "../helpers/RenderFrameworks";
import RenderLanguages from "../helpers/RenderLanguages";

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [language, setLanguage] = useState('')
    const [framework, setFramework] = useState('')
    const [renderFrameworkCondition, setRenderFrameworkCondition] = useState(false)

    // const updateLanguages = (language) =>{
    //     let newLanguages = languages
    //     languages.indexOf(language) === -1 ? newLanguages.push(language) : newLanguages = languages.filter((languageInArray) => languageInArray !== language)
    //     setLanguages(newLanguages)
    // }

    const updateLanguage = (language) =>{
        setLanguage(language)
        setFramework('')
        setRenderFrameworkCondition(true)
    }
    const updateFramework = (framework) =>{
        setFramework(framework)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (

        <div className={"search-page"}>
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
                                language: language
                            }}
                        >
                        <button className={"search-button"} type="submit"><i className="fa fa-search"></i></button>
                    </Link>
                </div>
            </form>
            <div className={"search-page-dropdowns"}>
                <div className={"language-dropdown"}>
                    <label className={"language-framework-label"}>Language:</label>
                    <RenderLanguages updateLanguage={updateLanguage}/>
                </div>
                <div className={"language-dropdown"}>
                    {renderFrameworkCondition ? <RenderFrameworks language={language} updateFramework={updateFramework}/> : null}
                </div>
                <button onClick={()=>console.log(language, framework)}>click</button>
            </div>
        </div>
    );
};

export default SearchBar;
