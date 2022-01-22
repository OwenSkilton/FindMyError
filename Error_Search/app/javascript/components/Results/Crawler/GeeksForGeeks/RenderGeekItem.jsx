import React, {useEffect, useState} from 'react';

const RenderGeekItem = ({crawledItem, user}) => {
    const [showFavouritedStar ,setShowFavouritedStar] = useState(false)
    const [response, setResponse] = useState("null")

    const ConvertAtSymbolInEmail = (userEmail) => {return userEmail.replace(/@/g, "%40")}

    useEffect(()=>{
        setResponse(checkIfPostIsFavouriteToUser())
    },[])

    const postFavourite = async () => {
        setShowFavouritedStar(!showFavouritedStar)
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/postcrawleritemfavourite/${email}`;
        const data = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crawledItem.url)
            })
        const dataJson = await data.json();
        console.log(dataJson)
    }
    const deleteFavourite = async () => {
        setShowFavouritedStar(!showFavouritedStar)
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/deletecrawleritemfavourite/${email}`;
        await fetch(url,
            {
                method: 'Delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crawledItem.url)
            })
    }
    const checkIfPostIsFavouriteToUser = async () => {
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/findcrawleritemfavourite/${email}`;
        const data = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crawledItem.url)
            })
        const dataJson = await data.json();
        console.log(data)
        dataJson.crawlerFavouritesID ? setShowFavouritedStar(!showFavouritedStar) : null
        return dataJson.crawlerFavouritesID ? dataJson : null
    }

    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;


    return (
        <div className={"crawler-singular-result"}>
            <div className="crawler-icons">
                    <span>
                        <div className={"favourite"}>
                        {showFavouritedStar ?
                            <i className="fa fa-star checked" onClick={() => deleteFavourite()}/> :
                            <i className="bi bi-star" onClick={() => postFavourite()}/>
                        }
                        </div>
                    </span>
            </div>
            <div className={"crawler-result-inner-content"}>
                <div className="cse-image">
                    <img src={"https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png"}/>
                </div>
                {crawledItem.data.difficultyLevel?
                    <div className="crawler-redhat-item-type">
                        <p>{crawledItem.data.difficultyLevel}</p>
                    </div> : null}
                <div className={"crawler-item-title"}>
                    <a href={`${crawledItem.url}`}>{crawledItem.data.pageTitle}</a>
                </div>
                {crawledItem.data.snippet ?
                <div className="crawler-geek-snippet">
                    <p style={{fontWeight: "bold", marginBottom: "0.8rem"}}>Snippet: </p>
                    <p>{truncate(crawledItem.data.snippet, 200, "...")}</p>
                </div> : <p style={{fontStyle: "italic", marginBottom: "0.8rem"}}>No snippet Available</p>}
                <div className={"crawler-date-author"}>
                    <div className={"crawler-date"} >{crawledItem.data.updateDate}</div>
                    <div className="crawler-geek-author"> <p style={{marginRight: "0.3rem"}}>Author: </p> <p style={{fontStyle: "italic"}}> {crawledItem.data.author}</p></div>
                </div>
            </div>
        </div>
    );
};

export default RenderGeekItem;
