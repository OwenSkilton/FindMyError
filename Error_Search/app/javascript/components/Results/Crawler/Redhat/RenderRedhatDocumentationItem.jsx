import React, {useEffect, useState} from 'react';

const RenderRedhatDocumentationItem = ({crawledItem, user}) => {
    const [showFavouritedStar ,setShowFavouritedStar] = useState(false)
    const [response, setResponse] = useState("null")
    const [formattedUpdatedDate, setFormattedUpdatedDate] = useState(new Date(crawledItem.data.updateDate).toString().substring(0, 24))

    // const ConvertAtSymbolInEmail = (userEmail) => {return userEmail.replace(/@/g, "%40")}

    // useEffect(()=>{
    //     setResponse(checkIfPostIsFavouriteToUser())
    // },[])

    // const postFavourite = async () => {
    //     setShowFavouritedStar(!showFavouritedStar)
    //     const email = ConvertAtSymbolInEmail(user.email)
    //     const url = `http://localhost:8080/backend/postdocumentationfavourite/${email}/${result.cacheId}`;
    //     const data = await fetch(url,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(result.link)
    //         })
    //     const dataJson = await data.json();
    //     console.log(dataJson)
    // }
    // const deleteFavourite = async () => {
    //     setShowFavouritedStar(!showFavouritedStar)
    //     const email = ConvertAtSymbolInEmail(user.email)
    //     const url = `http://localhost:8080/backend/deletedocumentationfavourite/${email}/${result.cacheId}`;
    //     await fetch(url,
    //         {
    //             method: 'Delete',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(result.link)
    //         })
    // }
    // const checkIfPostIsFavouriteToUser = async () => {
    //     const email = ConvertAtSymbolInEmail(user.email)
    //     const url = `http://localhost:8080/backend/finddocumentationfavourite/${email}/${result.cacheId}`;
    //     const data = await fetch(url)
    //     const dataJson = await data.json();
    //     dataJson.documentationFavouritesID ? setShowFavouritedStar(!showFavouritedStar) : null
    //     return dataJson.documentationFavouritesID ? dataJson : null
    // }

    return (
        <div className={"crawler-singular-result"}>
            <div className="crawler-icons">
                    <span>
                        <div className={"favourite"}>
                        {showFavouritedStar ?
                            <i className="fa fa-star checked" /> :
                            <i className="bi bi-star" />
                        }
                        </div>
                    </span>
            </div>
            <div className={"crawler-result-inner-content"}>
                <div className="cse-image">
                    <img src={"data:image/png;base64,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"}/>
                </div>
                <div className="crawler-redhat-item-type">
                    <p>{crawledItem.siteType}</p>
                </div>
                <div className={"crawler-item-title"}>
                    <a href={`${crawledItem.url}`}>{crawledItem.data.pageTitle}</a>
                </div>

                <div className={"crawler-documentation-content"}>
                    <h1 className={"crawler-documentation-title"}>{crawledItem.data.documentationTitle}</h1>
                    {crawledItem.data.abstract ? <>
                            <p className={"crawler-abstract"}>Abstract:</p>
                            <p>{crawledItem.data.abstract}</p>
                        </>
                        : null }
                </div>
            </div>
        </div>
    );
};

export default RenderRedhatDocumentationItem;
