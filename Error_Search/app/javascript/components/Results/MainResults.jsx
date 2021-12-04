import React from 'react';

const MainResults = (result) => {
    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

    return (
        <>
            <div className={"results"}>
            <span className={"Icons"}>
                    <i className="bi bi-arrow-up-square"></i>
                    <i className="bi bi-star"></i>
                    <i className="bi bi-arrow-down-square"></i>
            </span>
                <div className={"results-content"}>
                    <h3>
                        <a href={result.link} className={"hyperlink-for-question"}>
                            {truncate(result.title.replace(/&#39;/g,'\''), 80, "...")}
                        </a>
                    </h3>
                    <p>

                    </p>
                    <div className={"tags"}>
                        {result.tags.map((tag)=>{
                            return <a className={"inner-tags"} key={tag}>{tag}</a>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainResults;
