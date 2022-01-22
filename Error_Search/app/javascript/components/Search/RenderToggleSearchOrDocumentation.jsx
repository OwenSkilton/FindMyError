import React, {Component} from 'react';

class RenderToggleSearchOrDocumentation extends Component {
    constructor(props) {
        super(props);
        this.state={
            typeOfSearchParameter: "empty"
        }
        this.toggleTypeOfSearchParameterValue = this.toggleTypeOfSearchParameterValue.bind(this)
    }

    toggleTypeOfSearchParameterValue(e){
        this.setState({typeOfSearchParameter: e.target.id})
    }

    // render() {
    //     return (
    //         <div className={"search-page-toggle-search-button"}>
    //             <label className={"toggle-button"}>
    //                 <input onClick={this.toggleTypeOfSearchParameterValue} type="checkbox"/>
    //                 <span className={"slider"}></span>
    //             </label>
    //             <label className={"toggle-button-label"}>{this.state.typeOfSearchParameter === "Error_Message" ? "Error Message" : "Documentation"}</label>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div className={"search-page-radio-buttons"}>
                <label className="individual-radio">
                    <input onClick={(e) => this.toggleTypeOfSearchParameterValue(e)} type="radio" id="Error_Message" name="selector" tabIndex="1"/>
                        <span>Error Forum</span>
                </label>
                <label className="individual-radio">
                    <input onClick={(e) => this.toggleTypeOfSearchParameterValue(e)} type="radio" id="Documentation" name="selector" tabIndex="2"/>
                        <span>Documentation</span>
                </label>
                <label className="individual-radio">
                    <input onClick={(e) => this.toggleTypeOfSearchParameterValue(e)} type="radio" id="Crawler" name="selector" tabIndex="3"/>
                        <span>Crawler</span>
                </label>
            </div>
        );
    }
}

export default RenderToggleSearchOrDocumentation;