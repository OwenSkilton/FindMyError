import React from 'react';
import RenderLanguages from "../helpers/RenderLanguages";
import RenderFrameworks from "../helpers/RenderFrameworks";

const RenderDropdownsSearchPage = ({language, updateLanguage, framework, updateFramework, showFrameworkDropdown, setShowFrameworkDropdown}) => {
    return (
        <>
            <div className={"search-page-dropdowns"}>
                <div className={"language-dropdown"}>
                    <label className={"language-framework-label"}>Language:</label>
                    <RenderLanguages
                        updateLanguage={updateLanguage}
                        setShowFrameworkDropdown={setShowFrameworkDropdown}
                    />
                </div>
                <div className={"framework-dropdown"}>
                    {showFrameworkDropdown ? <RenderFrameworks
                        language={language}
                        updateFramework={updateFramework}
                    /> : null}
                </div>
            </div>
        </>
    );
};

export default RenderDropdownsSearchPage;