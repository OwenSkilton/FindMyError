import React from 'react';
import RenderLanguages from "../helpers/RenderLanguages";
import RenderFrameworks from "../helpers/RenderFrameworks";

const RenderDropdownsResultsPage = ({language, updateLanguage, framework, updateFramework, showFrameworkDropdown}) => {
    return (
        <>
            <div className={"results-page-dropdowns"}>
                <div className={"language-dropdown"}>
                    <label className={"language-framework-label"}>Language:</label>
                    <RenderLanguages
                        updateLanguage={updateLanguage}
                    />
                </div>
                <div className={"framework-dropdown"}>
                    {showFrameworkDropdown ? <RenderFrameworks
                        language={language}
                        updateFramework={updateFramework}
                    /> : null}
                </div>
            </div>
            <button onClick={()=>console.log("Language: " + language, "\nFramework: " + framework)}>click</button>
        </>
    );
};

export default RenderDropdownsResultsPage;
