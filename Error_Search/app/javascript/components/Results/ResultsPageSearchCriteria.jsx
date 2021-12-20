import React, {useState} from 'react';
import RenderLanguages from "../helpers/RenderLanguages";
import RenderFrameworks from "../helpers/RenderFrameworks";
import RenderDropdownsResultsPage from "./RenderDropdownsResultsPage";
const ResultsPageSearchCriteria = ({language, setLanguage, framework, setFramework, showFrameworkDropdown, setShowFrameworkDropdown}) => {

    const updateLanguage = (language) =>{
        setLanguage(language)
        setFramework("empty")
        if(language !== "empty"){
            setShowFrameworkDropdown(true)
            document.getElementById("framework-dropdown").selectedIndex = null
        } else{
            setShowFrameworkDropdown(false)
        }
    }
    const updateFramework = (framework) =>{
        setFramework(framework)
    }

    return (
        <div className={"search-refinement-body"}>
            <ol>
                <li>
                    <h2 className={"title"}>Refine Search:</h2>
                    <RenderDropdownsResultsPage
                        language={language}
                        framework={framework}
                        updateLanguage={updateLanguage}
                        updateFramework={updateFramework}
                        showFrameworkDropdown={showFrameworkDropdown}
                        setShowFrameworkDropdown={setShowFrameworkDropdown}
                    />
                </li>
            </ol>

        </div>
    );
};

export default ResultsPageSearchCriteria;
