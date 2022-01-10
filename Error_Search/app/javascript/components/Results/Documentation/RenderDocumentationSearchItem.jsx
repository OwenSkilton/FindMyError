import React, {useEffect, useState} from 'react';

const MyComponent = ({result, user}) => {
    const [showFavouritedStar ,setShowFavouritedStar] = useState(false)
    const [response, setResponse] = useState("null")

    const ConvertAtSymbolInEmail = (userEmail) => {return userEmail.replace(/@/g, "%40")}

    useEffect(()=>{
        setResponse(checkIfPostIsFavouriteToUser())
    },[])

    const postFavourite = async () => {
        setShowFavouritedStar(!showFavouritedStar)
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/postdocumentationfavourite/${email}/${result.cacheId}`;
        const data = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result.link)
            })
        const dataJson = await data.json();
        console.log(dataJson)
    }
    const deleteFavourite = async () => {
        setShowFavouritedStar(!showFavouritedStar)
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/deletedocumentationfavourite/${email}/${result.cacheId}`;
        await fetch(url,
            {
                method: 'Delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result.link)
            })
    }
    const checkIfPostIsFavouriteToUser = async () => {
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/finddocumentationfavourite/${email}/${result.cacheId}`;
        const data = await fetch(url)
        const dataJson = await data.json();
        dataJson.documentationFavouritesID ? setShowFavouritedStar(!showFavouritedStar) : null
        return dataJson.documentationFavouritesID ? dataJson : null
    }

    return (
        <div className={"documentation-singular-result"}>
            <div className="documentation-icons">
                    <span>
                        <div>
                            <i className="bi bi-arrow-up-square"/>
                        </div>
                        <div className={"favourite"}>
                        {showFavouritedStar ?
                            <i className="fa fa-star checked" onClick={() => deleteFavourite()}/> :
                            <i className="bi bi-star" onClick={() => postFavourite()}/>
                        }
                        </div>
                        <div>
                            <i className="bi bi-arrow-down-square"/>
                        </div>
                    </span>
            </div>
            <div className={"documentation-result-inner-content"}>
                <div className="cse-image">
                    {result.pagemap.cse_image ? <img className={"pagemap-icon"} src={`${result.pagemap.cse_image[0].src}`}/> : null}
                </div>
                <div className={"documentation-title"}>
                    <a href={`${result.link}`}>{result.title}</a>
                </div>
                <div className={"documentation-snippet"}>
                    {result.snippet}
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
