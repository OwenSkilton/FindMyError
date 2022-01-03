import React from 'react';

const RenderSearchHistory = (searchHistory) => {
    return (
        <div className={"search-history-section"}>
            <h1 className={"title"}>Search History: </h1>
            {searchHistory.searchHistory.map((historyItem)=>{
                return <a key={historyItem.searchhistoryid}> {historyItem.keywords } </a>
            })}
        </div>
    );
};

export default RenderSearchHistory;
