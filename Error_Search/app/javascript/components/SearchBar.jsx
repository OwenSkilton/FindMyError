import React, {useState} from "react"

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [languages, setLanguages] = useState([])
    const [response, setResponse] = useState([])

    const updateLanguages = (language) =>{
        let newLanguages = languages
        languages.indexOf(language) === -1 ? newLanguages.push(language) : newLanguages = languages.filter((languageInArray) => languageInArray !== language)
        setLanguages(newLanguages)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${e}&site=stackoverflow`
        const data = await fetch(url)
        const dataJson = await data.json();
        setResponse(dataJson);
        console.log(dataJson)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id={"SearchBar"}
                    name={"SearchBar"}
                    placeholder={"search"}
                    className={"SearchBar"}
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}/>
                <button type="submit" ><i className="fa fa-search"></i></button>
            </form>
            <br/>

            <label>
                <input className={"checkbox"} type="checkbox" name={"Java"} value={"Java"} onChange={(e)=>updateLanguages(e.target.value)}/>
                Java
            </label>
            <label>
                <input className={"checkbox"} type="checkbox" name={"JavaScript"} value={"JavaScript"} onChange={(e)=>updateLanguages(e.target.value)}/>
                JavaScript
            </label>
            <label>
                <input className={"checkbox"} type="checkbox" name={"Ruby"} value={"Ruby"} onChange={(e)=>updateLanguages(e.target.value)}/>
                Ruby
            </label>
        </>
    );
};

export default SearchBar;
