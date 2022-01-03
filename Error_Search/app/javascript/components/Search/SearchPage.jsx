import React, {Component, useState} from "react"
import {Link} from "react-router-dom";
import RenderDropdownsSearchPage from './RenderDropdownsSearchPage'
import {dropdownValuesToRenderFrameworkDropdown} from '../helpers/dropdownValuesToRenderFrameworkDropdown'

export default class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            search: "",
            language: "empty",
            framework: "empty",
            showFrameworkDropdown: false,
        }
        this.updateLanguage = this.updateLanguage.bind(this)
        this.updateFramework = this.updateFramework.bind(this)
        this.postSearchHistory = this.postSearchHistory.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setShowFrameworkDropdown=this.setShowFrameworkDropdown.bind(this)
        this.convertAtSymbolInEmail=this.convertAtSymbolInEmail.bind(this)
        this.postSearchHistoryURLCalculator=this.postSearchHistoryURLCalculator.bind(this)
    }

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
        console.log(this.state.language)
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
        console.log(dataJson)
    }

    async handleSubmit (e){
        e.preventDefault()
        const url = `http://localhost:3000/resultsPageArguments?language=${this.state.language}&search=${this.state.search}&framework=${this.state.framework}`
        await fetch(url).then(()=>this.postSearchHistory())
        .finally(setTimeout(() => {window.location.assign('/results/ResultsPage')}, 100))
    }

    convertAtSymbolInEmail(userEmail){return userEmail.replace(/@/g, "%40")}

    postSearchHistoryURLCalculator(email){
        if(this.state.language === "empty"&& this.state.framework ==="empty"){
            return `http://localhost:8080/backend/postsearchhistory/${email}/${this.state.search}`
        } else if(this.state.language !== "empty" && this.state.framework === "empty") {
            return `http://localhost:8080/backend/postsearchhistory/${email}/${this.state.search}/${this.state.language}`
        } else {
            return `http://localhost:8080/backend/postsearchhistory/${email}/${this.state.search}/${this.state.language}/${this.state.framework}`
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
                            value={this.state.search}
                            onChange={(e)=>this.setState({
                                search: e.target.value
                            })}
                        />
                        <button className={"search-button"} type="submit"><i className="fa fa-search"></i></button>
                    </div>
                </form>
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