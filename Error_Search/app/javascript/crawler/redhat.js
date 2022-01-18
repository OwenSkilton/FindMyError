const lodash = require('lodash')

const {
    composeAsync,
    arrayPairsToObject,
    fetchHtmlFromUrl,
    fetchElementsInnerText,
    fetchElementAttribute,
    extractFromElements,
    extractURLAttribute,
    fetchCustomSearchEngineJSON
} = require("./helpers/helper.js")

// *****************************************
// |           GENERIC FUNCTIONS           |
// *****************************************

const searchEngineBase = `https://www.googleapis.com/customsearch/v1?key=AIzaSyD5YELqGoAfzwHJMCL7G8_01MPKRVCYN4g&cx=77cddc3562f67c7c0&q=`;

const searchEngineURLFormer = (url) => {
    return lodash.isString(url) ? `${searchEngineBase}${url}` : null;
}

const findURLLinksFromCustomSearchEngine = (url) =>{
    return fetchCustomSearchEngineJSON(url).then(r => r.items.map((item)=>item.link));
}

// ******************************************
// |         DOM SPECIFIC FUNCTIONS         |
// ******************************************

const extractRedHatDetails = $ => {
    const mainSite = $("#cp-main");
    const pageTitle = fetchElementAttribute("href")(mainSite.find("#breadcrumbs").find("a")) !== "/errata" ? mainSite.find("h1.title") : mainSite.find("div.print-single").find("h1");
    const SolutionVerified = mainSite.find("span.status")
    const subscriberExclusive = !!fetchElementsInnerText(mainSite.find("h2.section-title-red"))
    const updateDate = mainSite.find("time.moment_date")
    return Promise.all([
        fetchElementsInnerText(pageTitle.contents().first()),
        fetchElementsInnerText(SolutionVerified),
        subscriberExclusive,
        fetchElementsInnerText(updateDate)
    ]).then(([ title, solutionStatus, subscriberExclusive, updateDate]) => ({ title, solutionStatus, subscriberExclusive, updateDate})
    );
};

// *******************************************
// |           CONTROLLER FUNCTION           |
// *******************************************

const fetchSearchItems = (redhatUrl) => {
    return composeAsync(extractRedHatDetails, fetchHtmlFromUrl)(redhatUrl)
}

module.exports = {
    fetchSearchItems,
    searchEngineURLFormer,
    findURLLinksFromCustomSearchEngine
};

