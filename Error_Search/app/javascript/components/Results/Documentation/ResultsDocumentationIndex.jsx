import React, {useEffect} from 'react';
import DocumentationResultsBody from "./DocumentationResultsBody";
import ResultsPageSearchCriteria from "../ResultsPageSearchCriteria";
import renderLoading from "../Loading";
import FilterButtons from "../FilterButtons"
import {dropdownValuesToRenderFrameworkDropdown} from "../../helpers/dropdownValuesToRenderFrameworkDropdown";
import {TestDataDocumentation} from "../../helpers/TestDataDocumentation";

export default class ResultsDocumentationIndex extends React.Component {

    // CONSTRUCTOR

    constructor(props) {
        super(props);
        this.state={
            results: [] || TestDataDocumentation,
            loading: true,
            searchKeywords: this.props.searchkeywords,
            language: this.props.language,
            framework: this.props.framework,
            searchParameter: this.props.searchparameter,
            user: this.props.user,
            showFrameworkDropdown: false,
            resultCounter: 1
        }
        this.prepopulateSearchParams=this.prepopulateSearchParams.bind(this)
        this.renderResults=this.renderResults.bind(this)
        this.setLanguage=this.setLanguage.bind(this)
        this.setFramework=this.setFramework.bind(this)
        this.setSearchKeywords=this.setSearchKeywords.bind(this)
        this.fetchDocumentationAPI=this.fetchDocumentationAPI.bind(this)
        this.documentationAPIURLCondition=this.documentationAPIURLCondition.bind(this)
        this.loadMoreResults=this.loadMoreResults.bind(this)
        this.setShowFrameworkDropdown=this.setShowFrameworkDropdown.bind(this)
    }

    // First Render Functions

    componentDidMount() {
        this.prepopulateSearchParams()
        this.state.resultCounter === 1 ? this.fetchDocumentationAPI().finally(() => this.setState({loading: false})) : null
    }

    prepopulateSearchParams() {
        document.getElementById("language-dropdown").value = this.state.language
        if(dropdownValuesToRenderFrameworkDropdown.indexOf( this.state.language) > -1){
            this.setState({
                showFrameworkDropdown: true
            });
            (setTimeout(() => {document.getElementById("framework-dropdown").value = this.state.framework}, 10))
        }
    }

    // API FUNCTIONS

    async fetchDocumentationAPI(){
        for (let i = this.state.resultCounter; i <= this.state.resultCounter; i+=10) {
            const url = this.documentationAPIURLCondition(i);
            const data = await fetch(url)
            const dataJson = await data.json();
            console.log(dataJson)
            dataJson.items ? this.setState({results: [...this.state.results, dataJson]}) : null
        }
    }

    // API HELPERS

    documentationAPIURLCondition(startNumber){
        if(this.state.language === "empty" && this.state.framework === "empty") {
            return `https://www.googleapis.com/customsearch/v1?key=AIzaSyA1OlOX-IBrQfVF99eRpracnGPz-QWoSOo&cx=21730bc2f33f692cb&q=${this.state.searchKeywords}&start=${startNumber}`
        } else if(this.state.language !== "empty" && this.state.framework === "empty") {
            return `https://www.googleapis.com/customsearch/v1?key=AIzaSyA1OlOX-IBrQfVF99eRpracnGPz-QWoSOo&cx=21730bc2f33f692cb&q=${this.state.language}%20${this.state.searchKeywords}&start=${startNumber}`
        } else {
            return `https://www.googleapis.com/customsearch/v1?key=AIzaSyA1OlOX-IBrQfVF99eRpracnGPz-QWoSOo&cx=21730bc2f33f692cb&q=${this.state.framework}%20${this.state.searchKeywords}&start=${startNumber}`
        }
    }

    loadMoreResults(){
        this.setState(prevState=>{
            return {resultCounter: prevState.resultCounter + 10}
        }, () => {this.fetchDocumentationAPI()})
    }

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

    // RENDER FUNCTIONS



    renderResults = () =>{
        const user = this.state.user
        return (
            <>
                <div className="documentation-results-container">
                    <FilterButtons/>
                    <div className={"documentation-search-results-body"}>
                        {this.state.results.map((result) => {
                            return <DocumentationResultsBody
                                key={result.toString()}
                                {...result}
                                user={user}
                            />
                        })}
                        <div className={"load-more-container"}>
                            <button className={"load-more"} onClick={()=>this.loadMoreResults()}>Load More</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    render() {
        return (
            <>
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