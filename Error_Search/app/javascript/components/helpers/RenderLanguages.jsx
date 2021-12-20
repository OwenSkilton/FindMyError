import React from "react";

const renderLanguages = ({updateLanguage}) =>{

    const handleChange=(e)=>{
        updateLanguage(e)
    }

    return(
        <>
            <label className="select">
                <select id={"language-dropdown"} className="select" onChange={(e)=>handleChange(e.target.value)}>
                    <option value="empty">None</option>
                    <option value="android">Android</option>
                    <option value="asp.net">asp.net</option>
                    <option value="c">C</option>
                    <option value="c#">C#</option>
                    <option value="c++">C++</option>
                    <option value="css">CSS</option>
                    <option value="excel">Excel</option>
                    <option value="html">HTML</option>
                    <option value="ios">IOS</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                    <option value="json">JSON</option>
                    <option value="objective-c">Objective-C</option>
                    <option value="php">PHP</option>
                    <option value="python">Python</option>
                    <option value="r">R</option>
                    <option value="ruby">Ruby</option>
                    <option value="sql">SQL</option>
                    <option value="swift">Swift</option>
                </select>
            </label>
    </>
    )
}

export default renderLanguages;