import React from 'react';

const FilterButtons = () => {
    return (
        <div>
            <div className={"search-results-buttons"}>
                <button className={"filter-button"}>Most popular</button>
                <button className={"filter-button"}>Relevance</button>
                <button className={"filter-button"}>Random</button>
            </div>
        </div>
    );
};

export default FilterButtons;
