import React from 'react';
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
            results: "" || TestDataDocumentation,
            loading: true,
            searchKeywords: this.props.searchkeywords,
            language: this.props.language,
            framework: this.props.framework,
            searchParameter: this.props.searchparameter,
            user: this.props.user,
            showFrameworkDropdown: false,
        }
        this.prepopulateSearchParams=this.prepopulateSearchParams.bind(this)
        this.renderResults=this.renderResults.bind(this)
        this.setLanguage=this.setLanguage.bind(this)
        this.setFramework=this.setFramework.bind(this)
        this.setSearchKeywords=this.setSearchKeywords.bind(this)
        this.fetchDocumentationAPI=this.fetchDocumentationAPI.bind(this)
        this.documentationAPIURLCondition=this.documentationAPIURLCondition.bind(this)
        this.setShowFrameworkDropdown=this.setShowFrameworkDropdown.bind(this)
    }

    // First Render Functions

    componentDidMount() {
        this.fetchDocumentationAPI().finally(() => this.setState({loading: false}));
        this.prepopulateSearchParams()
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
        for (let i = 1; i < 2; i+=10) {
            const url = this.documentationAPIURLCondition(i);
            const data = await fetch(url)
            const dataJson = await data.json();
            dataJson.items ? this.setState({results: [...this.state.results, dataJson]}) : null
        }
        console.log(this.state.results)
        // https://stackoverflow.com/questions/16925762/getting-more-than-10-results-by-google-custom-search-api-v1-in-java
        // to get more than 10 results add the start param onto URL and start from 11 or 21 or 31 etc.
        // For loop that preforms multiple searches
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
                            return <DocumentationResultsBody key={result.toString()} {...result} user={user} />
                        })}
                    </div>
                </div>
            </>
        )
    }

    render() {
        return (
            <>
                <button onClick={()=>{console.log(this.state)}}>State </button>
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