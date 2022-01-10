import React, {useState} from 'react';

const RenderSearchHistory = (searchHistoryItem) => {
    const [historyItem, setHistoryItem] = useState(searchHistoryItem.searchHistoryItem)

    return (
        <div>
            {historyItem.date} {historyItem.keywords} {historyItem.language} {historyItem.framework}
        </div>
    );
};

export default RenderSearchHistory;
