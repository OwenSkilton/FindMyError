import React, {useEffect, useState} from 'react';
import MainResults from "./MainResults";
import ResultsPageSearchCriteria from "./ResultsPageSearchCriteria";
import {useLocation} from "react-router-dom";

const ResultsIndex = () => {
    const [search, setSearch] = useState(useLocation().state.search)
    const [languages, setLanguages] = useState(useLocation().state.languages)
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        async function fetchStackOverflowAPI() {
            const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=votes&intitle=${search}&site=stackoverflow`
             // Tags api : https://api.stackexchange.com/2.3/search?order=desc&sort=activity&tagged=reactjs&intitle=useEffect&site=stackoverflow
            const data = await fetch(url)
            const dataJson = await data.json();
            setResults(dataJson)
        }
        fetchStackOverflowAPI().finally(()=>setLoading(false));
    }, [])

    const renderLoading = () => {
        return(<h2>LOADING...</h2>)
    }

    const renderResults = () =>{
        const resultItems = results.items
        return(
            <div className="results-container">
                <h2>Results</h2>
                {resultItems.map((result)=>{
                    return <MainResults key={result.question_id} {...result}/>
                })}
            </div>
        )
    }

    return (
        <>
            {/*<ResultsPageSearchCriteria/>*/}
            { loading ? renderLoading() : renderResults()}
        </>
    );
};

export default ResultsIndex

