const logger = require('morgan')
const express = require('express')
const cors = require('cors')
const {fetchGeekDetails} = require("./geekforgeek");
const {
    sendResponse,
    searchEngineURLFormer,
    findURLLinksFromCustomSearchEngine
} = require('./helpers/helper');
const {
    fetchSearchSolution,
    fetchSearchDocumentation,
    fetchSearchArticles,
} = require("./redhat");

const app = express();

const port = 3001;
app.set('port', port);

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/crawlerurls/:keywords', (req,res,next)=>{
    const keywords = req.params.keywords;
    const finalSearchURL = searchEngineURLFormer(keywords)
    findURLLinksFromCustomSearchEngine(finalSearchURL)
        .then(allURLs => res.json({ status: "success", allURLs }))
})

app.post('/crawlerdata', (req,res,next)=>{
    req.body.url.indexOf("redhat") > -1 ?
        req.body.url.indexOf("solutions") > -1 ?
            sendResponse(res)(fetchSearchSolution(req.body.url))
            : req.body.url.indexOf("articles") > -1 ?
                sendResponse(res)(fetchSearchArticles(req.body.url))
                : req.body.url.indexOf("documentation") > -1 ?
                    sendResponse(res)(fetchSearchDocumentation(req.body.url)) : null
        : req.body.url.indexOf("geeksforgeeks") > -1 ? sendResponse(res)(fetchGeekDetails(req.body.url)) : null
})

app.listen(port, () => console.log("Listening on port: " + port))
