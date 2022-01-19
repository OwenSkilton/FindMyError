const lodash = require('lodash')

const {
    composeAsync,
    arrayPairsToObject,
    fetchHtmlFromUrl,
    fetchElementsInnerText,
    fetchElementAttribute,
    extractFromElements,
    extractURLAttribute,
    fetchCustomSearchEngineJSON,
    withoutNulls,
    withoutEmptyString
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

const extractRedHatDetailsSolution = $ => {
    const mainSite = $("#cp-main");
    // const pageTitle = fetchElementAttribute("href")(mainSite.find("#breadcrumbs").find("a")) !== "/errata" ? mainSite.find("h1.title") : mainSite.find("div.print-single").find("h1");
    const pageTitle = mainSite.find("h1.title")
    const SolutionVerified = mainSite.find("span.status")
    const subscriberExclusive = !!fetchElementsInnerText(mainSite.find("h2.section-title-red"))
    const updateDate = mainSite.find("time.moment_date")
    const issueBulletPoints = fetchElementsInnerText(mainSite.find("section.field_kcs_issue_txt").find("ul")).split("\n")
    const resolution = subscriberExclusive ? "" : mainSite.find("section.field_kcs_resolution_txt").find("p")

    return Promise.all([
        fetchElementsInnerText(pageTitle.contents().first()),
        fetchElementsInnerText(SolutionVerified),
        subscriberExclusive,
        fetchElementsInnerText(updateDate),
        withoutEmptyString(withoutNulls(issueBulletPoints)),
        fetchElementsInnerText(resolution)
    ]).then(([ pageTitle, solutionStatus, subscriberExclusive, updateDate, issueBulletPoints, resolution]) => ({ pageTitle, solutionStatus, subscriberExclusive, updateDate, issueBulletPoints, resolution})
    );
};

const extractRedHatDetailsDocumentation = $ => {
    const mainSite = $("#cp-main");
    const pageTitle = mainSite.find("h1.title")
    const abstract = mainSite.find("div.abstract").find("div.para")
    const documentationTitle = mainSite.find("ol.menu").find("li.leaf")

    return Promise.all([
        fetchElementsInnerText(pageTitle.contents().first()),
        fetchElementsInnerText(abstract),
        fetchElementsInnerText(documentationTitle.contents().first()),
        ]).then(([ pageTitle, abstract, documentationTitle]) => ({ pageTitle, abstract, documentationTitle})
    );
}

const extractRedHatDetailsArticles = $ => {
    const mainSite = $("#cp-main");
    const pageTitle = mainSite.find("h1.title")
    const updateDate = mainSite.find("time.moment_date")
    const articleBrief = mainSite.find("div.field-name-field-kcs-article-body").find("p")

    return Promise.all([
        fetchElementsInnerText(pageTitle.contents().first()),
        fetchElementsInnerText(updateDate),
        fetchElementsInnerText(articleBrief.contents().first()),

    ]).then(([ pageTitle, updateDate, articleBrief]) => ({ pageTitle, updateDate, articleBrief})
    );
}

// *******************************************
// |           CONTROLLER FUNCTION           |
// *******************************************
const fetchSearchSolution = (redhatUrl) => {
    return composeAsync(extractRedHatDetailsSolution, fetchHtmlFromUrl)(redhatUrl)
}
const fetchSearchDocumentation = (redhatUrl) => {
    return composeAsync(extractRedHatDetailsDocumentation, fetchHtmlFromUrl)(redhatUrl)
}
const fetchSearchArticles = (redhatUrl) => {
    return composeAsync(extractRedHatDetailsArticles, fetchHtmlFromUrl)(redhatUrl)
}

module.exports = {
    fetchSearchSolution,
    fetchSearchDocumentation,
    fetchSearchArticles,
    searchEngineURLFormer,
    findURLLinksFromCustomSearchEngine
};
