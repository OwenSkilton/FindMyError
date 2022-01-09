import React, {useState} from 'react';

const RenderSearchHistory = (searchHistoryItem) => {
    const [historyItem, setHistoryItem] = useState(searchHistoryItem.searchHistoryItem)

    return (
        <div>
            {console.log(historyItem)}
            {historyItem.date} {historyItem.keywords} {historyItem.language} {historyItem.framework}
        </div>
    );
};

export default RenderSearchHistory;
