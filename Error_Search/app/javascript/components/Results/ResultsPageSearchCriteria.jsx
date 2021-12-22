import React, {useState} from 'react';
import RenderDropdownsResultsPage from "./RenderDropdownsResultsPage";
import {dropdownValuesToRenderFrameworkDropdown} from '../helpers/dropdownValuesToRenderFrameworkDropdown'
const ResultsPageSearchCriteria = ({language, setLanguage, framework, setFramework, showFrameworkDropdown, setShowFrameworkDropdown}) => {

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
                    />
                </li>
            </ol>

        </div>
    );
};

export default ResultsPageSearchCriteria;
