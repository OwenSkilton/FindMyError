import React from 'react';

const ResultsPageSearchCriteria = () => {
    const renderLanguages = () =>{
        return(
            <>
                <option value="Java">Java</option>
                <option value="JS">JavaScript</option>
                <option value="Ruby">Ruby</option>
            </>
        )
    }
    const renderFrameworks = () =>{

        return(
            <>
                <option value="Java">Java</option>
                <option value="JS">JavaScript</option>
                <option value="Ruby">Ruby</option>
            </>
        )
    }
    return (
        <div className={"SearchCriteria"}>
            <h2 className={"Title"}>Refine Search:</h2>

            <div className={"SearchCriteriaCheckBoxes"}>
                Add dropdown box for language and framework
            </div>
            <select>
                {renderLanguages()}
            </select>
        </div>
    );
};

export default ResultsPageSearchCriteria;
