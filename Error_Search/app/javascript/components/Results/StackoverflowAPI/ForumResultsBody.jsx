import React, {useState, useEffect} from 'react';

const ForumResultsBody = ({tags, question_id, title, link, user, score}) => {
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
        const url = `http://localhost:8080/backend/postforumfavourite/${email}/${question_id}`;
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
    const deleteFavourite = async (question_id) => {
        setShowFavouritedStar(!showFavouritedStar)
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/deleteforumfavourite/${email}/${question_id}`;
        await fetch(url,
            {
                method: 'Delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
    const checkIfPostIsFavouriteToUser = async () => {
        const email = ConvertAtSymbolInEmail(user.email)
        const url = `http://localhost:8080/backend/findforumfavourite/${email}/${question_id}`;
        const data = await fetch(url)
        const dataJson = await data.json();
        console.log(dataJson)
        dataJson.forumFavouritesID ? setShowFavouritedStar(!showFavouritedStar) : null
        return dataJson.forumFavouritesID ? dataJson : null
    }

    return (
        <>
            <div className={"results"}>
                <div className="icons-and-score">
                    <span>
                        <div className={"favourite"}>
                        {showFavouritedStar ?
                            <i className="fa fa-star checked" onClick={() => deleteFavourite(question_id)}/> :
                            <i className="bi bi-star" onClick={() => postFavourite(question_id)}/>
                        }
                        </div>
                        <div className={"forum-post-rating"}>
                            {score}
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

export default ForumResultsBody;
