import React from 'react';
import RenderLanguages from "../helpers/RenderLanguages";
import RenderFrameworks from "../helpers/RenderFrameworks";

const RenderDropdownsResultsPage = ({language, updateLanguage, framework, updateFramework, showFrameworkDropdown}) => {

    return (
        <>
            <div className={"results-page-dropdowns"}>
                <div className={"language-dropdown-area"}>
                    <label className={"language-framework-label"}>Language:</label>
                    <RenderLanguages
                        updateLanguage={updateLanguage}
                    />
                </div>
                <div className={"framework-dropdown-area"}>
                    {showFrameworkDropdown ?
                        <RenderFrameworks
                            language={language}
                            updateFramework={updateFramework}
                        /> : null}
                </div>
            </div>
        </>
    );
};

export default RenderDropdownsResultsPage;