import React, {useState, useEffect} from 'react';
import RenderDocumentationSearchItem from "./RenderDocumentationSearchItem";

const DocumentationResultsBody = ({items, searchInformation, user}) => {

    return (
        <>
            {items.map((result) => {
                return (
                    <>
                        <RenderDocumentationSearchItem
                            key={result.cacheId}
                            result = {result}
                            user={user}
                        />
                    </>
                )
            })}
        </>
    );
};

export default DocumentationResultsBody;