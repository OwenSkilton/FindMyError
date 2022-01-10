import React from "react";

const renderFrameworks = ({language, updateFramework}) =>{

    const renderCorrectFrameworks = () =>{
        switch(language){
            case "javascript":
                return(
                    <>
                        <option value="angular">Angular</option>
                        <option value="jquery">JQuery</option>
                        <option value="node.js">Node.js</option>
                        <option value="reactjs">React</option>
                    </>
                )
            case "ruby":
                return(
                    <>
                        <option value="ruby-on-rails">Ruby-On-Rails</option>
                    </>
                )
            case "sql":
                return(
                    <>
                        <option value="mysql">MySQL</option>
                        <option value="sql-server">Sql-Server</option>
                    </>
                )
            case "asp.net":
                return(
                    <>
                        <option value=".net">.net</option>
                    </>
                )
            case "python":
                return(
                    <>
                        <option value="django">Django</option>
                        <option value="python-3.x">Python-3.x</option>
                    </>
                )
            case "java":
                return(
                    <>
                        <option value="spring">Spring</option>
                        <option value="spring-boot">Spring Boot</option>
                        <option value="spring-mvc">Spring-mvc</option>
                        <option value="hibernate">Hibernate</option>
                        <option value="jpa">JPA</option>
                    </>
                )
            case "php":
                return(
                    <>
                        <option value="laravel">Laravel</option>
                    </>
                )
            default:
                return null
        }
    }

    const handleChange=(e)=>{
        updateFramework(e)
    }

    return(
        <>
            <label className={"language-framework-label"}>Framework:</label>
            <label className="select">
                <select id={"framework-dropdown"} onChange={(e)=>handleChange(e.target.value)}>
                    <option value="empty">None</option>
                    {renderCorrectFrameworks()}
                </select>
            </label>
        </>
    )
}

export default renderFrameworks;