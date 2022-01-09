import React, {Component} from 'react';
import RenderFavourites from "./RenderFavourites";
import RenderProfilePage from "./RenderProfilePage";
import RenderSearchHistory from "./RenderSearchHistory"

export default class ProfileHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favouritesLoading: true,
            searchHistoryLoading: true,
            user: this.props.user,
            favourites: "",
            searchHistory: ""
        }
        this.findFavouritedPosts = this.findFavouritedPosts.bind(this)
        this.ConvertAtSymbolInEmail = this.ConvertAtSymbolInEmail.bind(this)
    }

    componentDidMount() {
        this.findFavouritedPosts()
        this.findSearchHistory()
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
    async findSearchHistory() {
        const email = this.ConvertAtSymbolInEmail(this.state.user.email)
        const url = `http://localhost:8080/backend/findusersearchhistory/${email}`;
        const data = await fetch(url)
        const dataJson = await data.json();
        this.setState({
            searchHistoryLoading: false,
            searchHistory: dataJson
        })
    }

    render() {
        return (
            <div className={"profile-page"}>
                <RenderProfilePage user={this.state.user}/>

                {this.state.favouritesLoading ? null :
                    <div className={"favourites-section"}>
                        <h1 className={"title"}>Favourited results: </h1>
                        {this.state.favourites.map((favourite)=> {
                            return <RenderFavourites key={favourite.postid.postid} favourite={favourite}/>
                        })}
                    </div>
                }

                {this.state.searchHistoryLoading ? null :
                    <div className={"search-history-section"}>
                        <h1 className={"title"}>Search History: </h1>
                        {this.state.searchHistory.map((historyItem)=>{
                            return <RenderSearchHistory key={historyItem.searchhistoryid} searchHistoryItem={historyItem}/>
                        })}
                    </div>
                }
            </div>
        );
    }
};
