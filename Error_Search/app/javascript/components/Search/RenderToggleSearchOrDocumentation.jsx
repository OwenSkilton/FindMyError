import React, {Component} from 'react';

class RenderToggleSearchOrDocumentation extends Component {
    constructor(props) {
        super(props);
        this.state={
            typeOfSearchParameter: "Error_Message"
        }
        this.toggleTypeOfSearchParameterValue = this.toggleTypeOfSearchParameterValue.bind(this)
    }

    toggleTypeOfSearchParameterValue(){
        if (this.state.typeOfSearchParameter === "Error_Message") {
            this.setState({
                typeOfSearchParameter: "Documentation"
            })
        } else {
            this.setState({
                typeOfSearchParameter: "Error_Message"
            })
        }
    }

    render() {
        return (
            <div className={"search-page-toggle-search-button"}>
                <label className={"toggle-button"}>
                    <input onClick={this.toggleTypeOfSearchParameterValue} type="checkbox"/>
                    <span className={"slider"}></span>
                </label>
                <label className={"toggle-button-label"}>{this.state.typeOfSearchParameter === "Error_Message" ? "Error Message" : "Documentation"}</label>
            </div>
        );
    }
}

export default RenderToggleSearchOrDocumentation;