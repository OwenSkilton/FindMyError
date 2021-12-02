import React, {useEffect, useState} from 'react';
import RightResults from "./RightResults";
import ResultsPageSearchCriteria from "./ResultsPageSearchCriteria";
import {useLocation} from "react-router-dom";

const ResultsIndex = () => {
    const [search, setSearch] = useState(useLocation().state.search)
    const [languages, setLanguages] = useState(useLocation().state.languages)
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        async function fetchStackOverflowAPI() {
            const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${search}&site=stackoverflow`
            const data = await fetch(url)
            const dataJson = await data.json();
            setResults(dataJson)
        }
        fetchStackOverflowAPI().finally(()=>setLoading(false));
    }, [search])

    const renderLoading = () => {
        return(<h2>LOADING...</h2>)
    }

    const renderResults = () =>{
        const resultItems = results.items
        return(
            <div className="container">
                <h2>Results</h2>
                {resultItems.map((result)=>{
                    return <RightResults key={result.question_id} {...result}/>
                })}
            </div>
        )
    }

    return (
        <>
            <ResultsPageSearchCriteria/>
            { loading ? renderLoading() : renderResults()}
        </>
    );
};

export default ResultsIndex

