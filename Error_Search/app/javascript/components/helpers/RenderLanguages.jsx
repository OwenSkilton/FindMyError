import React from "react";

const renderLanguages = ({updateLanguage}) =>{

    const handleChange=(e)=>{
        updateLanguage(e)
    }

    return(
        <>
            <label className="select">
                <select className="select" onChange={(e)=>handleChange(e.target.value)}>
                    <option value="empty">None</option>
                    <option value="Java">Java</option>
                    <option value="JS">JavaScript</option>
                    <option value="Ruby">Ruby</option>
                </select>
            </label>
    </>
    )
}

export default renderLanguages;