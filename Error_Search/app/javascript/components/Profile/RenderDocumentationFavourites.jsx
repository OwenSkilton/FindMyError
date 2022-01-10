import React, {useState, useEffect} from 'react';

const RenderDocumentationFavourites = (favourite) => {
    const [favouritedSearch, setFavouritedSearch] = useState("")

    return (
        <div>
            {favourite.favourite.documentationid.documentationid} {favourite.favourite.date}
        </div>

    );
};

export default RenderDocumentationFavourites;
