import React from "react";

const renderLanguages = ({updateLanguage}) =>{
    return(
        <select onChange={(e)=>updateLanguage(e.target.value)}>
            <option value="">None</option>
            <option value="Java">Java</option>
            <option value="JS">JavaScript</option>
            <option value="Ruby">Ruby</option>
        </select>
    )
}

export default renderLanguages;