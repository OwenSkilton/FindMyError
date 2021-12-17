import React, {useState} from 'react';
import RenderLanguages from "../helpers/RenderLanguages";
import RenderFrameworks from "../helpers/RenderFrameworks";
const ResultsPageSearchCriteria = ({language, updateLanguage, framework, updateFramework}) => {
    return (
        <div className={"search-refinement-body"}>
            <ol>
                <li> </li>
                <li> </li>
                <li> </li>
            </ol>
            <h2 className={"Title"}>Refine Search:</h2>
            <div className={"search-page-dropdowns"}>
                <div className={"language-dropdown"}>
                    <label className={"language-framework-label"}>Language:</label>
                    <RenderLanguages updateLanguage={updateLanguage}/>
                </div>
                <div className={"language-dropdown"}>
                    <RenderFrameworks language={language} updateFramework={updateFramework}/>
                </div>
                <button onClick={()=>console.log(language, framework)}>click</button>
            </div>
        </div>
    );
};

export default ResultsPageSearchCriteria;
