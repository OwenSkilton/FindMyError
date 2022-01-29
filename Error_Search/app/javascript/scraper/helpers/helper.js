const lodash = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio')

const {
    fetchElementsInnerText,
    fetchElementAttribute,
    extractFromElements,
    extractURLAttribute,
} = require("./domparsing.js")


// *****************************************
// |             API FUNCTIONS             |
// *****************************************

const searchEngineBase = `https://www.googleapis.com/customsearch/v1?key=AIzaSyD5YELqGoAfzwHJMCL7G8_01MPKRVCYN4g&cx=77cddc3562f67c7c0&q=`;

const searchEngineURLFormer = (url) => {
    return lodash.isString(url) ? `${searchEngineBase}${url}` : null;
}

const findURLLinksFromCustomSearchEngine = (url) =>{
    return fetchCustomSearchEngineJSON(url).then(r => r.items.map((item)=>item.link));
}

// *****************************************
// |           GENERIC FUNCTIONS           |
// *****************************************

// Creates composite function

const composeAsync = (...fns) => arg => {
    return lodash.flattenDeep(fns).reduceRight(async (current, fn) => {
        if (lodash.isFunction(fn)) return fn(await current);
        throw new TypeError("compose() expects only functions as parameters.");
    }, arg);
};

const withoutNulls = (array) =>
    lodash.isArray(array) ? array.filter(val => !lodash.isNull(val)) : lodash[lodash];

const withoutEmptyString = (array) =>
    lodash.isArray(array) ? array.filter(val => val!=="") : lodash[lodash];

// ********************************************
// |           REQUEST AND RESPONSE           |
// ********************************************

// sendResponse expects HTTP response (res) and returns the function with the argument request
const sendResponse = res => async request => {
    return await request
        // .then(data => console.log("data: " + data.toString()))
        .then(data => res.json({ status: "success", data }))
        .catch(({ status: code = 500 }) =>
            res.status(code).json({ status: "failure", code, message: code === 404 ? 'Not found.' : 'Request failed.' })
        );
};

const fetchHtmlFromUrl = async url => {
    return await axios
        .get(url)
        .then(response => cheerio.load(response.data))
        .catch(error => {
            error.status = (error.response && error.response.status) || 500;
            throw error;
        });
};

const fetchCustomSearchEngineJSON = async url => {
    return await axios
        .get(url)
        .then(response => response.data)
        .catch(error => {
            error.status = (error.response && error.response.status) || 500;
            throw error;
        });
};

module.exports = {
    composeAsync,
    sendResponse,
    fetchHtmlFromUrl,
    fetchElementsInnerText,
    fetchElementAttribute,
    extractFromElements,
    extractURLAttribute,
    fetchCustomSearchEngineJSON,
    withoutNulls,
    withoutEmptyString,
    searchEngineURLFormer,
    findURLLinksFromCustomSearchEngine
};





