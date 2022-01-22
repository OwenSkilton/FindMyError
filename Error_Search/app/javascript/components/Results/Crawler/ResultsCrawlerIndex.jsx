import React from 'react';
import ResultsPageSearchCriteria from "../ResultsPageSearchCriteria";
import renderLoading from "../Loading";
import {dropdownValuesToRenderFrameworkDropdown} from "../../helpers/dropdownValuesToRenderFrameworkDropdown";
import {TestURLDataCrawler} from "../../helpers/TestURLDataCrawler";
import axios from "axios";
import RenderRedhatSolutionItem from "./Redhat/RenderRedhatSolutionItem";
import RenderRedhatDocumentationItem from "./Redhat/RenderRedhatDocumentationItem";
import RenderRedhatArticleItem from "./Redhat/RenderRedhatArticleItem";
import RenderGeekItem from "./GeeksForGeeks/RenderGeekItem";

export default class ResultsCrawlerIndex extends React.Component {

    // CONSTRUCTOR

    constructor(props) {
        super(props);
        this.state={
            crawledData: [],
            urlsToCrawl: [] || TestURLDataCrawler,
            // urlsToCrawl: TestURLDataCrawler,
            loading: true,
            searchKeywords: this.props.searchkeywords,
            language: this.props.language,
            framework: this.props.framework,
            searchParameter: this.props.searchparameter,
            user: this.props.user,
            showFrameworkDropdown: false,
            resultCounter: 1
        }
        this.fetchCrawlerURLs = this.fetchCrawlerURLs.bind(this)
        this.webCrawl = this.webCrawl.bind(this)
        this.crawlURL = this.crawlURL.bind(this)
        this.findSiteCrawled = this.findSiteCrawled.bind(this)
        this.findTypeOfSite = this.findTypeOfSite.bind(this)
        this.renderRedhatItem = this.renderRedhatItem.bind(this)
        this.crawlerURLFormer = this.crawlerURLFormer.bind(this)
        this.prepopulateSearchParams = this.prepopulateSearchParams.bind(this)
    }

    componentDidMount() {
        this.prepopulateSearchParams()
        this.webCrawl()
    }

    // CRAWLER FUNCTIONS

    webCrawl(){
        this.fetchCrawlerURLs().then((crawlerURLs) => {
            crawlerURLs.allURLs.map((url)=>{
                this.crawlURL(url).then((dataJson)=>{
                    dataJson.url = url
                    dataJson.siteCrawled = this.findSiteCrawled(url)
                    dataJson.siteCrawled === "redhat" ? dataJson.siteType = this.findTypeOfSite(url): null
                    this.setState({crawledData: [...this.state.crawledData, dataJson]})
                })
            })
        }).finally(()=>this.setState({loading: false}))
    }

    async fetchCrawlerURLs(){
        const url = this.crawlerURLFormer();
        const data = await fetch(url)
        return await data.json()
        // return this.state.urlsToCrawl
    }

    async crawlURL(url){
        return await axios.post("http://localhost:3001/crawlerdata", {url})
            .then((res) => res.data)
            .catch(err => {
                console.error(err);
            })
    }

    // First Render Functions

    prepopulateSearchParams() {
        document.getElementById("language-dropdown").value = this.state.language
        if(dropdownValuesToRenderFrameworkDropdown.indexOf( this.state.language) > -1){
            this.setState({
                showFrameworkDropdown: true
            });
            (setTimeout(() => {document.getElementById("framework-dropdown").value = this.state.framework}, 10))
        }
    }

    // TODO - Load more results on crawler search (Same as documentation)

    // loadMoreResults(){
    //     this.setState(prevState=>{
    //         return {resultCounter: prevState.resultCounter + 10}
    //     }, () => {this.fetchDocumentationAPI()})
    // }

    // HELPER FUNCTIONS

    setLanguage = (language) => {
        this.setState({
            language: language
        })
    }
    setFramework = (framework) => {
        this.setState({
            framework: framework
        })
    }
    setShowFrameworkDropdown = (condition) => {
        this.setState({
            showFrameworkDropdown: condition
        })
    }
    setSearchKeywords = (searchKeywords) =>{
        this.setState({
            searchKeywords: searchKeywords
        })
    }

    findSiteCrawled(url){
        return url.indexOf("redhat") > -1 ? "redhat"
            :  url.indexOf("geeksforgeeks") > -1 ? "geeksforgeeks" : null
    }
    findTypeOfSite(url){
        return url.indexOf("solutions") > -1 ? "solutions"
            :  url.indexOf("articles") > -1 ? "articles" :
                url.indexOf("documentation") > -1 ? "documentation" : null
    }
    crawlerURLFormer(){
        if(this.state.language === "empty" && this.state.framework === "empty") {
            return `http://localhost:3001/crawlerurls/${this.state.searchKeywords}`
        } else if(this.state.language !== "empty" && this.state.framework === "empty") {
            return `http://localhost:3001/crawlerurls/${this.state.language}%20${this.state.searchKeywords}`
        } else {
            return `http://localhost:3001/crawlerurls/${this.state.language}%20${this.state.searchKeywords}`
        }
    }

    // RENDER FUNCTIONS

    renderResults = () =>{
        const user = this.state.user
        return (
            <>
                <div className="crawler-results-container">
                    <div className={"crawler-search-results-body"}>
                        {this.state.loading ? null :
                            this.state.crawledData.map((crawledItem)=>
                                crawledItem.siteCrawled === "redhat" ?
                                    this.renderRedhatItem(crawledItem, user)
                                    : crawledItem.siteCrawled === "geeksforgeeks" ?
                                     <RenderGeekItem
                                         key={crawledItem.url}
                                         user={user}
                                         crawledItem={crawledItem}
                                     />: null

                            )
                        }
                    </div>
                </div>
            </>
        )
    }

    renderRedhatItem(crawledItem, user){
        return crawledItem.siteType === "solutions" ?
            <RenderRedhatSolutionItem
                key={crawledItem.url}
                user={user}
                crawledItem={crawledItem}
            />
            : crawledItem.siteType === "documentation" ?
            <RenderRedhatDocumentationItem
                key={crawledItem.url}
                user={user}
                crawledItem={crawledItem}
            />
            : crawledItem.siteType === "articles" ?
                <RenderRedhatArticleItem
                    key={crawledItem.url}
                    user={user}
                    crawledItem={crawledItem}
                />
                : null
    }

    render() {
        return (
            <>
                {/* TODO - Brief description on what sort of search occurred */}
                <div className={"results-page-search-criteria"}>
                    <ResultsPageSearchCriteria
                        language={this.state.language}
                        setLanguage={this.setLanguage}
                        framework={this.state.framework}
                        setFramework={this.setFramework}
                        showFrameworkDropdown={this.state.showFrameworkDropdown}
                        setShowFrameworkDropdown={this.setShowFrameworkDropdown}
                        searchKeywords={this.state.searchKeywords}
                        setSearchKeywords={this.setSearchKeywords}
                        searchParameter = {this.state.searchParameter}
                        user = {this.state.user}
                    />
                    {this.state.loading ? renderLoading() : this.renderResults()}
                </div>
            </>
        );
    }
};