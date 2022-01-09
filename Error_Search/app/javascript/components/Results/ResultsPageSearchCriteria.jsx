import React, {useState} from 'react';
import RenderDropdownsResultsPage from "./RenderDropdownsResultsPage";
import {dropdownValuesToRenderFrameworkDropdown} from '../helpers/dropdownValuesToRenderFrameworkDropdown'
const ResultsPageSearchCriteria = ({language, setLanguage, framework, setFramework, showFrameworkDropdown, setShowFrameworkDropdown, searchKeywords, setSearchKeywords, searchParameter, user}) => {

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

    // EVENT HANDLER FUNCTIONS

     const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `http://localhost:3000/resultsPageArguments?language=${language}&searchkeywords=${searchKeywords}&framework=${framework}&searchparameter=${searchParameter}`
        await fetch(url).then(() => postSearchHistory())
            .finally(setTimeout(() => {
                window.location.assign('/results/ResultsPage')
            }, 100))
    }

    const ConvertAtSymbolInEmail = (userEmail) => {return userEmail.replace(/@/g, "%40")}


    const postSearchHistory = async () => {
        const email = ConvertAtSymbolInEmail(user.email)
        const url = postSearchHistoryURLCalculator(email);
        const data = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const dataJson = await data.json();
    }

    const postSearchHistoryURLCalculator = (email) => {
        if(language === "empty"&& framework ==="empty"){
            return `http://localhost:8080/backend/postsearchhistory/${email}/${searchKeywords}/${searchParameter}`
        } else if(language !== "empty" && framework === "empty") {
            return `http://localhost:8080/backend/postsearchhistory/${email}/${searchKeywords}/${language}/${searchParameter}`
        } else {
            return `http://localhost:8080/backend/postsearchhistory/${email}/${searchKeywords}/${language}/${framework}/${searchParameter}`
        }
    }

    return (
        <div className={"search-refinement-body"}>
            <ol>
                <li>
                    <h2 style={{paddingBottom: "1rem"}} className={"title"}>Refine Search:</h2>
                    <h4 style={{opacity: "80%", paddingBottom: "2rem"}}> Searching via: <br/>{searchParameter === "Error_Message" ? "Error Message": "Documentation"}</h4>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div >
                            <input
                                type="text"
                                id={"SearchBar"}
                                name={"SearchBar"}
                                placeholder={"search"}
                                className={"form-control form-control-sm"}
                                style={{marginBottom: "1rem"}}
                                value={searchKeywords}
                                onChange={(e)=>setSearchKeywords(e.target.value)}
                            />
                        </div>
                        <button className={"button"} type="submit"><i className="fa fa-search"></i></button>
                    </form>
                    <RenderDropdownsResultsPage
                        language={language}
                        framework={framework}
                        updateLanguage={updateLanguage}
                        updateFramework={updateFramework}
                        showFrameworkDropdown={showFrameworkDropdown}
                    />
                </li>
            </ol>
        </div>
    );
};

export default ResultsPageSearchCriteria;
