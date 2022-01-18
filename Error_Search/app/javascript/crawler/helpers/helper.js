const lodash = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio')

const {
    fetchElementsInnerText,
    fetchElementAttribute,
    extractFromElements,
    extractURLAttribute,
} = require("./domparsing.js")

// https://lodash.com/docs/4.17.15

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

// Filter null values from array

const arrayPairsToObject = (array) => {
    return array.reduce((obj, pair) => ({...obj, ...pair}), {})
}

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
    arrayPairsToObject,
    sendResponse,
    fetchHtmlFromUrl,
    fetchElementsInnerText,
    fetchElementAttribute,
    extractFromElements,
    extractURLAttribute,
    fetchCustomSearchEngineJSON
};





