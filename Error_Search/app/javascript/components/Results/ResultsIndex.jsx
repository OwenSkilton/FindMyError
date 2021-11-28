import React, {useEffect, useState} from 'react';
import RightResults from "./RightResults";
import ResultsPageSearchCriteria from "./ResultsPageSearchCriteria";
import {useLocation} from "react-router-dom";

const ResultsIndex = () => {
    const [search, setSearch] = useState(useLocation().state.search)
    const [languages, setLanguages] = useState(useLocation().state.languages)
    const [results, setResults] = useState([])

    useEffect(()=>{
        async function fetchStackOverflowAPI() {
            const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${search}&site=stackoverflow`
            const data = await fetch(url)
            const dataJson = await data.json();
            setResults(dataJson)
        }
        fetchStackOverflowAPI();
    }, [search])

    const consoleLogAll = () =>{
        console.log(languages)
        console.log(results)
    }

    return (
        <>
            <button onClick={()=>consoleLogAll()}>Click me!</button>
            <ResultsPageSearchCriteria/>
            <RightResults/>
        </>
    );
};

export default ResultsIndex

