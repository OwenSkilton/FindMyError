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


    const numberOfResults = () => {
        console.log(results)
        if (results.items.length >= 30) {
            return ("There are more than 30 results returned, you might want to refine your search")
        } else {
            return (results.items.length + " results: ")
        }
    }

    const renderResults = () =>{
        const resultItems = results.items
        return(
            <>
                <div className={"ResultsPlusSearchCriteriaArea"}>
                    <div className={"SearchRefinementArea"}>
                        <ResultsPageSearchCriteria/>
                    </div>
                    <div className="results-container">
                        <h2>{numberOfResults()}</h2>
                        <div className={"SearchResultsButtons"}>
                            <button className={"FilterButton"}>Most popular</button>
                            <button className={"FilterButton"}>Relevance</button>
                            <button className={"FilterButton"}>Random</button>
                        </div>
                        <div className={"MainSearchResults"}>
                            {resultItems.map((result)=>{
                                return <MainResults key={result.question_id} {...result}/>
                            })}
                        </div>
                    </div>
                </div>
            </>
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

