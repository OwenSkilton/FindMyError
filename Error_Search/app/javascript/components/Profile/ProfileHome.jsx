import React, {Component} from 'react';
import RenderFavourites from "./RenderFavourites";
import RenderProfilePage from "./RenderProfilePage";
import RenderSearchHistory from "./RenderSearchHistory"

export default class ProfileHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favouritesLoading: true,
            user: this.props.user,
            favourites: ""
        }
        this.findFavouritedPosts = this.findFavouritedPosts.bind(this)
        this.ConvertAtSymbolInEmail = this.ConvertAtSymbolInEmail.bind(this)
    }

    componentDidMount() {
        this.findFavouritedPosts()
    }

    ConvertAtSymbolInEmail(userEmail){return userEmail.replace(/@/g, "%40")}
    async findFavouritedPosts() {
        const email = this.ConvertAtSymbolInEmail(this.state.user.email)
        const url = `http://localhost:8080/backend/finduserfavourites/${email}`;
        const data = await fetch(url)
        const dataJson = await data.json();
        this.setState({
            favouritesLoading: false,
            favourites: dataJson
        })
    }

    render() {
        return (
            <div className={"profile-page"}>
                <RenderProfilePage user={this.state.user}/>
                {this.state.favouritesLoading ? null : <RenderFavourites favourites={this.state.favourites}/>}
                <RenderSearchHistory />
            </div>
        );
    }
};
