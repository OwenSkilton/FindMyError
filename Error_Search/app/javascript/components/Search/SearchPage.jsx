import React, {useState} from "react"
import {Link} from "react-router-dom";
import RenderDropdownsSearchPage from './RenderDropdownsSearchPage'
import {dropdownValuesToRenderFrameworkDropdown} from '../helpers/dropdownValuesToRenderFrameworkDropdown'

const SearchPage = () => {
    const [search, setSearch] = useState("")
    const [language, setLanguage] = useState('empty')
    const [framework, setFramework] = useState('empty')
    const [showFrameworkDropdown, setShowFrameworkDropdown] = useState(false)

    const updateLanguage = (language) =>{
        setLanguage(language)
        setFramework("empty")
        if(dropdownValuesToRenderFrameworkDropdown.indexOf(language) > -1){
            setShowFrameworkDropdown(true)
            document.getElementById("framework-dropdown").selectedIndex = null
        } else{
            setShowFrameworkDropdown(false)
        }
    }

    const updateFramework = (framework) =>{
        setFramework(framework)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `http://localhost:3000/resultsPageArguments?language=${language}&search=${search}&framework=${framework}`
        await fetch(url).then(resp=>console.log(resp))
            .finally(setTimeout(() => {window.location.assign('/results/ResultsPage')}, 100))
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
                    <button className={"search-button"} type="submit"><i className="fa fa-search"></i></button>
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
