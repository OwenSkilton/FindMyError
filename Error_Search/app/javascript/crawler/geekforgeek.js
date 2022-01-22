const {
    composeAsync,
    fetchHtmlFromUrl,
    fetchElementsInnerText,
    fetchElementAttribute,
    extractFromElements,
    extractURLAttribute,
    withoutNulls,
    withoutEmptyString
} = require("./helpers/helper.js")

// ******************************************
// |         DOM SPECIFIC FUNCTIONS         |
// ******************************************
let url = ""
const extractGeekForGeekDetails = $ => {
    const mainSite = url.indexOf("tutorial") > -1 ? $("#main") : $("#home-page");
    const pageTitle = fetchElementsInnerText(mainSite.find("h1").contents().first()) ? mainSite.find("h1") : mainSiteTutorials.find("h1.entry-title")
    const metaList = mainSite.find("div.meta").find("ul").find("li").find("span")
    const difficultyLevel = metaList.find("a")
    const author = mainSite.find("div.author .info .name").find("a")
    const snippet = mainSite.find("div.text")

    // Want 2nd item in meta list for the date

    return Promise.all([
        fetchElementsInnerText(pageTitle.contents().first()),
        fetchElementsInnerText(difficultyLevel.contents().first()),
        fetchElementsInnerText(metaList.contents().last()),
        fetchElementsInnerText(author),
        fetchElementsInnerText(snippet.contents().first()),
    ]).then(([ pageTitle, difficultyLevel, updateDate, author, snippet]) => ({ pageTitle, difficultyLevel, updateDate, author, snippet})
    );
}

// *******************************************
// |           CONTROLLER FUNCTIONS          |
// *******************************************

const fetchGeekDetails = (geekURL) => {
    url = geekURL
    return composeAsync(extractGeekForGeekDetails, fetchHtmlFromUrl)(geekURL)
}

module.exports = {
    fetchGeekDetails
};