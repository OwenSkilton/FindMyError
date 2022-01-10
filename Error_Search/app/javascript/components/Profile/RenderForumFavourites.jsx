import React, {useState, useEffect} from 'react';

const RenderForumFavourites = (favourite) => {
    const [favouritedSearch, setFavouritedSearch] = useState("")
    const [favouriteID, setFavouriteID] = useState(favourite.favourite.postid.postid)

    useEffect(()=>{
        getFavouritedPostFromStackOverflowAPI();
    }, [])

    const getFavouritedPostFromStackOverflowAPI = async () => {
        const url = `https://api.stackexchange.com/2.3/questions/${favouriteID}?order=desc&sort=activity&site=stackoverflow`;
        const data = await fetch(url)
        const dataJson = await data.json();
        setFavouritedSearch(dataJson.items[0]);
    }

    return (
        <div>
            {favouritedSearch.question_id} {favourite.favourite.date}
        </div>

    );
};

export default RenderForumFavourites;
