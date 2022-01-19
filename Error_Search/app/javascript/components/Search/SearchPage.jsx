import React, {Component, useState} from "react"
import RenderDropdownsSearchPage from './RenderDropdownsSearchPage'
import {dropdownValuesToRenderFrameworkDropdown} from '../helpers/dropdownValuesToRenderFrameworkDropdown'
import RenderToggleSearchOrDocumentation from "./RenderToggleSearchOrDocumentation";

export default class SearchPage extends Component {

    // CONSTRUCTOR

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            searchkeywords: "",
            language: "empty",
            framework: "empty",
            showFrameworkDropdown: false,
        }
        this.toggleTypeOfSearchParameterValue = React.createRef();
        this.updateLanguage = this.updateLanguage.bind(this)
        this.updateFramework = this.updateFramework.bind(this)
        this.postSearchHistory = this.postSearchHistory.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setShowFrameworkDropdown=this.setShowFrameworkDropdown.bind(this)
        this.convertAtSymbolInEmail=this.convertAtSymbolInEmail.bind(this)
        this.postSearchHistoryURLCalculator=this.postSearchHistoryURLCalculator.bind(this)
    }

    // HELPER FUNCTIONS

    updateLanguage(language){
        this.setState({
            language: language,
            framework: "empty"
        })
        if(dropdownValuesToRenderFrameworkDropdown.indexOf(language) > -1){
            this.setState({
                showFrameworkDropdown: true,
            })
            document.getElementById("framework-dropdown").selectedIndex = null
        } else{
            this.setState({
                showFrameworkDropdown: false,
            })
        }
    }
    updateFramework(framework){
        this.setState({
            framework: framework
        })
    }
    setShowFrameworkDropdown = (condition) => {
        this.setState({
            showFrameworkDropdown: condition
        })
    }
    convertAtSymbolInEmail(userEmail){return userEmail.replace(/@/g, "%40")}

    // EVENT HANDLER FUNCTIONS

    async postSearchHistory() {
        const email = this.convertAtSymbolInEmail(this.state.user.email)
        const url = this.postSearchHistoryURLCalculator(email);
        const data = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const dataJson = await data.json();
    }

    async handleSubmit (e){
        e.preventDefault()
        if (this.toggleTypeOfSearchParameterValue.current.state.typeOfSearchParameter !== "empty") {
            const windowLocationURL = this.toggleTypeOfSearchParameterValue.current.state.typeOfSearchParameter === "Error_Message" ? "/results/ResultsPageErrorForum" : this.toggleTypeOfSearchParameterValue.current.state.typeOfSearchParameter === "Documentation" ? "/results/ResultsPageDocumentation" : "/results/ResultsPageCrawler"
            const url = `http://localhost:3000/resultsPageArguments?language=${this.state.language}&searchkeywords=${this.state.searchkeywords}&framework=${this.state.framework}&searchparameter=${this.toggleTypeOfSearchParameterValue.current.state.typeOfSearchParameter}`
            await fetch(url).then(() => this.postSearchHistory())
                .finally(setTimeout(() => {
                    window.location.assign(windowLocationURL)
                }, 100))
        }
        // TODO - RENDER EMPTY SEARCH *************************

    }

    postSearchHistoryURLCalculator(email){
        if(this.state.language === "empty"&& this.state.framework ==="empty"){
            return `http://localhost:8080/backend/postsearchhistory/${email}/${this.state.searchkeywords}/${this.toggleTypeOfSearchParameterValue.current.state.typeOfSearchParameter}`
        } else if(this.state.language !== "empty" && this.state.framework === "empty") {
            return `http://localhost:8080/backend/postsearchhistory/${email}/${this.state.searchkeywords}/${this.state.language}/${this.toggleTypeOfSearchParameterValue.current.state.typeOfSearchParameter}`
        } else {
            return `http://localhost:8080/backend/postsearchhistory/${email}/${this.state.searchkeywords}/${this.state.language}/${this.state.framework}/${this.toggleTypeOfSearchParameterValue.current.state.typeOfSearchParameter}`
        }
    }

    render() {
        return (
            <div className={"search-page"}>
                <form className={"search__container"} onSubmit={this.handleSubmit}>
                    <div className={"searchbar-outer-padding"}>
                        <input
                            type="text"
                            id={"SearchBar"}
                            name={"SearchBar"}
                            placeholder={"search"}
                            className={"search__input"}
                            value={this.state.searchkeywords}
                            onChange={(e)=>this.setState({
                                searchkeywords: e.target.value
                            })}
                        />
                        <button className={"search-button"} type="submit"><i className="fa fa-search"></i></button>
                    </div>
                </form>
                <RenderToggleSearchOrDocumentation ref={this.toggleTypeOfSearchParameterValue}/>
                <RenderDropdownsSearchPage
                    language={this.state.language}
                    framework={this.state.framework}
                    updateLanguage={this.updateLanguage}
                    updateFramework={this.updateFramework}
                    showFrameworkDropdown={this.state.showFrameworkDropdown}
                    setShowFrameworkDropdown={this.setShowFrameworkDropdown}
                />
            </div>
        );
    }
}