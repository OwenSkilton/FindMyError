import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import ResultsBody from "./ResultsBody";
import ResultsPageSearchCriteria from "./ResultsPageSearchCriteria";
import renderLoading from "./Loading";
import FilterButtons from "./FilterButtons"
import {TestData} from '../helpers/TestData'

export default class ResultsIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            results: "" || TestData,
            loading: true,
            search: this.props.search,
            language: this.props.language,
            framework: this.props.framework,
            showFrameworkDropdown: false,

        }
        this.fetchStackOverflowAPI=this.fetchStackOverflowAPI.bind(this)
        this.numberOfResults=this.numberOfResults.bind(this)
        this.renderResults=this.renderResults.bind(this)
        this.setLanguage=this.setLanguage.bind(this)
        this.setFramework=this.setFramework.bind(this)
        this.setLoading=this.setLoading.bind(this)
        this.setShowFrameworkDropdown=this.setShowFrameworkDropdown.bind(this)
    }

    componentDidMount() {
        this.fetchStackOverflowAPI().finally(() => this.setState({loading: false}));
    }

    async fetchStackOverflowAPI() {
        const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=votes&intitle=${this.state.search}&site=stackoverflow`
        // Tags api : https://api.stackexchange.com/2.3/search?order=desc&sort=activity&tagged=reactjs&intitle=useEffect&site=stackoverflow
        const data = await fetch(url)
        const dataJson = await data.json();
        this.setState({results: dataJson})
    }

    numberOfResults = () => {
        if (this.state.results.items.length >= 30) {
            return ("There are more than 30 results returned, you might want to refine your search")
        } else {
            return (this.state.results.items.length + " results: ")
        }
    }

    renderResults = () =>{
        const resultItems = this.state.results.items
        return (
            <>
                <div className="results-container">
                    {this.numberOfResults()}
                    <FilterButtons/>
                    <div className={"search-results-body"}>
                        {resultItems.map((result) => {
                            return <ResultsBody key={result.question_id} {...result}/>
                        })}
                    </div>
                </div>
            </>
        )
    }

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
    setLoading = (condition) => {
        this.setState({
            loading: condition
        })
    }
    setShowFrameworkDropdown = (condition) => {
        this.setState({
            showFrameworkDropdown: condition
        })
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
                    />
                    {this.state.loading ? renderLoading() : this.renderResults()}
                </div>
            </>
        );
    }
};