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

    return(
        <>
            <label className={"language-framework-label"}>Framework:</label>
            <select onChange={(e)=>updateFramework(e.target.value)}>
                <option value="">None</option>
                {renderCorrectFrameworks()}
            </select>
        </>
    )
}

export default renderFrameworks;