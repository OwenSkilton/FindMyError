import React from 'react';

const RenderFavourites = (favourites) => {
    return (
        <div className={"favourites-section"}>
            <h1 className={"title"}>Favourited results: </h1>
            {favourites.favourites.map((favourite)=>{
                return <a key={favourite.postid.postid}> {favourite.postid.postid } </a>
            })}
        </div>
    );
};

export default RenderFavourites;
