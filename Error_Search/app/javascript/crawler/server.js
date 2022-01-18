const logger = require('morgan')
const express = require('express')
const cors = require('cors')
const {fetchSearchItems} = require("./redhat");
const { sendResponse } = require('./helpers/helper');
const {
    searchEngineURLFormer,
    findURLLinksFromCustomSearchEngine
} = require('./redhat');

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
    // res.json({ status: "success", urls: req.body.url })
    sendResponse(res)(fetchSearchItems(req.body.url));
})

app.listen(port, () => console.log("Listening on port: " + port))
