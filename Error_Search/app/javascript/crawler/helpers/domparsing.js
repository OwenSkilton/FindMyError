// ***********************************
// |           DOM PARSING           |
// ***********************************

// Returns trimmed inner text of an element

const fetchElementsInnerText = (element) => {
    return element.text && element.text().trim() || null
}

// Fetches specified attribute from element and returns attribute value

const fetchElementAttribute = (attribute) => (element) => {
    return (element.attr && element.attr(attribute) || null)
}

// Extract array of values from a collection of elements using the extractor function
// returns the array or the return value from calling transform() on the array

const extractFromElements = (extractor) => (transform) => (element) => $ => {
    const results = element.map((i, elem) => extractor($(element))).get();
    return lodash.isFunction(transform) ? transform(results) : results
}


const extractURLAttribute = (attr) => fetchElementAttribute(attr);

module.exports = {
    fetchElementAttribute,
    fetchElementsInnerText,
    extractURLAttribute,
    extractFromElements,
}
