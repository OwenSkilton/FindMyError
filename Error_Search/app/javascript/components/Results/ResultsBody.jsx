import React, {useState, useEffect} from 'react';

const ResultsBody = ({tags, question_id, title, link, user}) => {
    const [showFavouritedStar ,setShowFavouritedStar] = useState(false)
    const [response, setResponse] = useState("null")

    useEffect(()=>{
        setResponse(checkIfPostIsFavouriteToUser())
    },[])


    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
    const ConvertAtSymbolInEmail = (userEmail) => {return userEmail.replace(/@/g, "%40")}
    const replaceJsonSyntax = (resultTitle) =>{
        return resultTitle.replace(/&#39;/g,'\'').replace(/&quot;/g,'"').replace(/&gt;/g,'>').replace(/&lt;/g,'<')
    }

    const postFavourite = async (question_id) => {
        setShowFavouritedStar(!showFavouritedStar)
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/postfavourite/${email}/${question_id}`;
        const data = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const dataJson = await data.json();
        console.log(dataJson)
    }
    const checkIfPostIsFavouriteToUser = async () => {
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/findfavourite/${email}/${question_id}`;
        const data = await fetch(url)
        const dataJson = await data.json();
        dataJson.favouritesID ? setShowFavouritedStar(!showFavouritedStar) : null
        return dataJson.favouritesID ? dataJson : null
    }

    return (

        <>
            <div className={"results"}>
                <div className="icons">
                    <span>
                        <div>
                            <i className="bi bi-arrow-up-square"/>
                        </div>
                        <div className={"favourite"}>
                        {showFavouritedStar ?
                            <i className="fa fa-star checked" onClick={() => postFavourite(question_id, link)}/> :
                            <i className="bi bi-star" onClick={() => postFavourite(question_id, link)}/>
                        }
                        </div>
                        <div>
                            <i className="bi bi-arrow-down-square"/>
                        </div>
                    </span>
                </div>
                <div className={"results-content"}>
                    <div className="question-title">
                        <a href={link} className={"hyperlink-for-question"}>
                            {truncate(replaceJsonSyntax(title), 80, "...")}
                        </a>
                    </div>
                    <div className={"inner-results-tags"}>
                        {tags.map((tag)=>{
                            return <p className={"inner-tags"} key={tag}>{tag}</p>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResultsBody;
