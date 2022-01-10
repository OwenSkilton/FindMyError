import React from 'react';
import ForumResultsBody from "./ForumResultsBody";
import ResultsPageSearchCriteria from "../ResultsPageSearchCriteria";
import renderLoading from "../Loading";
import FilterButtons from "../FilterButtons"
import {TestData} from '../../helpers/TestData'
import {dropdownValuesToRenderFrameworkDropdown} from "../../helpers/dropdownValuesToRenderFrameworkDropdown";

export default class ResultsForumIndex extends React.Component {

    // CONSTRUCTOR

    constructor(props) {
        super(props);
        this.state={
            results: "" || TestData,
            loading: true,
            searchKeywords: this.props.searchkeywords,
            language: this.props.language,
            framework: this.props.framework,
            searchParameter: this.props.searchparameter,
            user: this.props.user,
            showFrameworkDropdown: false,
        }
        this.numberOfResults=this.numberOfResults.bind(this)
        this.prepopulateSearchParams=this.prepopulateSearchParams.bind(this)
        this.renderResults=this.renderResults.bind(this)
        this.setLanguage=this.setLanguage.bind(this)
        this.setFramework=this.setFramework.bind(this)
        this.setSearchKeywords=this.setSearchKeywords.bind(this)
        this.fetchStackOverflowAPI=this.fetchStackOverflowAPI.bind(this)
        this.stackOverflowURLCondition=this.stackOverflowURLCondition.bind(this)
        this.setShowFrameworkDropdown=this.setShowFrameworkDropdown.bind(this)
    }

    // First Render Functions

    componentDidMount() {
        this.fetchStackOverflowAPI().finally(() => this.setState({loading: false}));
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

    async fetchStackOverflowAPI() {
        const url = this.stackOverflowURLCondition();
        const data = await fetch(url)
        const dataJson = await data.json();
        this.setState({results: dataJson})
        console.log(url)
    }

    // API HELPERS

    stackOverflowURLCondition(){
        if(this.state.language === "empty" && this.state.framework === "empty") {
            return `https://api.stackexchange.com/2.3/search?order=desc&sort=votes&intitle=${this.state.searchKeywords}&site=stackoverflow`
        } else if(this.state.language !== "empty" && this.state.framework === "empty") {
            return `https://api.stackexchange.com/2.3/search?order=desc&sort=votes&tagged=${this.state.language}&intitle=${this.state.searchKeywords}&site=stackoverflow`
        } else {
           return `https://api.stackexchange.com/2.3/search?order=desc&sort=votes&tagged=${this.state.language}%3B${this.state.framework}&intitle=${this.state.searchKeywords}&site=stackoverflow`
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

    numberOfResults = () => {
        if (this.state.results.items.length >= 30) {
            return ("There are more than 30 results returned, you might want to refine your search")
        } else {
            return (this.state.results.items.length + " results: ")
        }
    }

    renderResults = () =>{
        const resultItems = this.state.results.items
        const user = this.state.user
        return (
            <>
                <div className="results-container">
                    {this.numberOfResults()}
                    <FilterButtons/>
                    <div className={"search-results-body"}>
                        {resultItems.map((result) => {
                            {console.log(result)}
                            return <ForumResultsBody key={result.question_id} {...result} user={user} />
                        })}
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