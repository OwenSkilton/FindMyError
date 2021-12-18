import React, {useState} from "react"
import {Link} from "react-router-dom";
import RenderDropdownsSearchPage from './RenderDropdownsSearchPage'

const SearchPage = () => {
    const [search, setSearch] = useState("")
    const [language, setLanguage] = useState('empty')
    const [framework, setFramework] = useState('empty')
    const [showFrameworkDropdown, setShowFrameworkDropdown] = useState(false)

    const updateLanguage = (language) =>{
        setLanguage(language)
        setFramework("empty")
        if(language !== "empty"){
            setShowFrameworkDropdown(true)
        } else{
            setShowFrameworkDropdown(false)
        }
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
                                language: language,
                                framework: framework
                            }}
                        >
                        <button className={"search-button"} type="submit"><i className="fa fa-search"></i></button>
                    </Link>
                </div>
            </form>
            <RenderDropdownsSearchPage
                language={language}
                framework={framework}
                updateLanguage={updateLanguage}
                updateFramework={updateFramework}
                showFrameworkDropdown={showFrameworkDropdown}
                setShowFrameworkDropdown={setShowFrameworkDropdown}
            />
        </div>
    );
};

export default SearchPage;
