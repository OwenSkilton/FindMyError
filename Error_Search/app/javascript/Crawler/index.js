import * as cheerio from 'cheerio'
import * as urlParser from 'url'
import fs from 'fs'
import fetch from "node-fetch";

const crawledUrls = [];

const seedURL = "https://stevescooking.blogspot.com/"

let counter = 1

let counterFiveZeroThree = 0

const getUrl = (link) => {
    if (link.includes('http')){
        return link
    } else if(link.startsWith('/')){
        return seedURL + link
    }
    else {
        return seedURL.substring(0, seedURL.length-1) + link
    }
}

const convertHtmlTextIntoSingleString = (html) =>{
    let arrayOfWords = []
    let arrayOfHtmlSentences = html.split('\n').filter(val => val !== "")
    arrayOfHtmlSentences.forEach((elem) => arrayOfWords.push(elem.replace(/ /g, ' ').split(" ")))
    return arrayOfWords.flat(1).filter(val => val !== "").join(" ")
}

const writeToFile = async (html) => {
    const text = convertHtmlTextIntoSingleString(html)
    if (text.indexOf("Service Unavailable Service Unavailable Error 503") > -1 || text.length < 1)
    {
        counterFiveZeroThree++
        return
    }
    fs.writeFile(`./tempfiles/tempfile${counter}.txt`, text, (err) => {
        if (err) throw err
    })
    counter++
}

const crawlToGetAllUrls = async ({url}) => {
    if (crawledUrls.includes(url)) return;
    console.log("crawling", url);
    crawledUrls.push(url);

    const {host} = urlParser.parse(url)

    const response =  await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)
    await writeToFile($.text().trim())

    const links = $("a").map((i, link) => link.attribs.href).get()

    if (url === seedURL) {
        links
            .filter((link) => {
                if (link.startsWith('/')) return link
                else {
                    return link.includes(host) ? link : null
                }
            })
            .forEach((link) => {
                crawlToGetAllUrls({
                    url: getUrl(link)
                })
            })
    } else if (url !== seedURL && crawledUrls <101){
        links
            .filter((link) => {
                if (link.startsWith('/')) return link
                else {
                    return link.includes(host) ? link : null
                }
            })
            .forEach((link) => {
                crawlToGetAllUrls({
                    url: getUrl(link)
                })
            })
    }
};

const writeUrlsToFile = (url) =>{
    fs.appendFile(`./urlfile.txt`, "\n"+url, (err) => {
        if (err) throw err
    })
}

// await crawlToGetAllUrls({
//     url: seedURL
// }).finally(()=>crawledUrls.forEach((url)=>writeUrlsToFile(url)))

