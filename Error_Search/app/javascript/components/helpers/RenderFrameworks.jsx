import React from "react";

const renderFrameworks = ({language, updateFramework}) =>{

    const renderCorrectFrameworks = () =>{
        if (language === "Java"){
            return(
                <>
                <option value="Spring">Spring</option>
                <option value="JUnit">JUnit</option>
                </>
            )
        }if (language === "JS"){
            return(
                <>
                <option value="React">React</option>
                <option value="Angular">Angular</option>
                </>
            )
        }if (language === "Ruby"){
            return(
                <>
                    <option value="Rails">Rails</option>
                    <option value="Sinatra">Sinatra</option>
                </>
            )
        }
    }

    const handleChange=(e)=>{
        updateFramework(e)
    }

    return(
        <>
            <label className={"language-framework-label"}>Framework:</label>
            <label className="select">
                <select onChange={(e)=>handleChange(e.target.value)}>
                    <option value="empty">None</option>
                    {renderCorrectFrameworks()}
                </select>
            </label>
        </>
    )
}

export default renderFrameworks;