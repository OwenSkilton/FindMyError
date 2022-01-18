import React from "react"
import axios from "axios";
import {TestDataCrawler} from "./helpers/TestDataCrawler"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            crawledData: [],
            urlsToCrawl: [] || TestDataCrawler
        }
        this.fetchCrawlerURLs = this.fetchCrawlerURLs.bind(this)
        this.webCrawl = this.webCrawl.bind(this)
        this.crawlURL = this.crawlURL.bind(this)
    }

    webCrawl(){
        this.fetchCrawlerURLs().then((crawlerURLs) => {
            crawlerURLs.allURLs.map((url)=>{
                this.crawlURL(url).then((dataJson)=>{
                    this.setState({crawledData: [...this.state.crawledData, dataJson]})
                })
            })
        })
    }

    async fetchCrawlerURLs(){
        const url = "http://localhost:3001/crawlerurls/1445833";
        const data = await fetch(url)
        return await data.json()
        // return this.state.urlsToCrawl
    }

    async crawlURL(url){
        const data = await axios.post("http://localhost:3001/crawlerdata", {url})
            .then((res)=>res.data)
            .catch(err => {
                console.error(err);
            });
        return data
    }

    render() {
        return(
            <>
                <div className={"welcome-page"}>
                    <h1>Welcome to Error Search</h1>
                </div>
                <button onClick={()=>this.webCrawl()}>Click me</button>
                <button onClick={()=>console.log(this.state.crawledData)}>Click me</button>
            </>
        )
    }
}

export default Home
