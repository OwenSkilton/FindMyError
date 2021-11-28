import React from 'react';

const SearchParams = ({updateLanguages}) => {
    return (
        <>
            <label>
                <input className={"LanguagesCheckbox"} type="checkbox" name={"Java"} value={"Java"} onChange={(e)=>updateLanguages(e.target.value)}/>
                Java
            </label>
            <label>
                <input className={"LanguagesCheckbox"} type="checkbox" name={"JavaScript"} value={"JavaScript"} onChange={(e)=>updateLanguages(e.target.value)}/>
                JavaScript
            </label>
            <label>
                <input className={"LanguagesCheckbox"} type="checkbox" name={"Ruby"} value={"Ruby"} onChange={(e)=>updateLanguages(e.target.value)}/>
                Ruby
            </label>
        </>
    );
};

export default SearchParams;
