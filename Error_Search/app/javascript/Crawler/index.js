import * as cheerio from 'cheerio'
import * as urlParser from 'url'
import fs from 'fs'
import fetch from "node-fetch";

const crawledUrls = [];

const baseURL = "https://docs.oracle.com"
const seedURL = "https://www.w3schools.com/java"

let counter = 1

let counterFiveZeroThree = 0

const getUrl = (link) => {
    if (link.includes('http://') || link.includes('https://') ){
        return link
    } else if (link.includes('/www.')){
        return seedURL
    } else if(link.startsWith('/')){
        return baseURL + link
    }
    else {
        return seedURL + '/' + link
    }
}

const convertHtmlTextIntoSingleString = (html) =>{
    let arrayOfWords = []
    let arrayOfHtmlSentences = html.split('\n').filter(val => val !== "")
    arrayOfHtmlSentences.forEach((elem) => arrayOfWords.push(elem.replace(/ /g, ' ').split(" ")))
    return arrayOfWords.flat(1).filter(val => val !== "").join(" ")
}

const writeToFile = async (html, url) => {
    const text = convertHtmlTextIntoSingleString(html)
    if (text.indexOf("Service Unavailable Service Unavailable Error 503") > -1 || text.length < 1)
    {
        counterFiveZeroThree++
        return
    }
    fs.writeFile(`./tempfiles/tempfile${counter}.txt`, text, (err) => {
        if (err) throw err
    })
    fs.appendFile(`./urlfile.txt`, `$file ${counter}: ${url} \n`, (err) => {
        if (err) throw err
    })
    counter++
}

const wait = async (time) =>
    new Promise((res, rej) => setTimeout(() => res(), time));

const crawlToGetAllUrls = async ({url}) => {
    if (crawledUrls.includes(url)) return;
    console.log("crawling", url);
    crawledUrls.push(url);

    const {host} = urlParser.parse(url)

    await wait(1000)
    const response =  await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
        }
    })
     const html = await response.text()
    const $ = cheerio.load(html)
    await writeToFile($.text().trim(), url)

    const links = $("a").map((i, link) => link.attribs.href).get()
    if (url === seedURL) {
        links
            .filter((link) => {
                if (link.startsWith('/')) return link
                else if(!link.includes('http://') || !link.includes('https://') ) return link
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
    else if (url !== seedURL && crawledUrls.length < 101){
        links
            .filter((link) => {
                if (link.startsWith('/')) return link
                else if(!link.startsWith('/') || !link.includes('http://') || !link.includes('https://') ) return link
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

var startTime = performance.now()

await crawlToGetAllUrls({
    url: seedURL
})

var endTime = performance.now()

console.log(`Crawl took: ${endTime - startTime} milliseconds. Number of URLs crawledL: ${crawledUrls.length}`)
