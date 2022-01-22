import React, {Component} from 'react';
import RenderForumFavourites from "./RenderForumFavourites";
import RenderDocumentationFavourites from "./RenderDocumentationFavourites";
import RenderProfilePage from "./RenderProfilePage";
import RenderSearchHistory from "./RenderSearchHistory"
import RenderCrawlerFavourites from "./RenderCrawlerFavourites";

export default class ProfileHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forumFavouritesLoading: true,
            documentationFavouritesLoading: true,
            crawlerFavouritesLoading: true,
            searchHistoryLoading: true,
            user: this.props.user,
            forumFavourites: "",
            documentationFavourites: "",
            crawlerFavourites: "",
            searchHistory: ""
        }
        this.findForumFavouritedPosts = this.findForumFavouritedPosts.bind(this)
        this.findDocumentationFavouritedPosts = this.findDocumentationFavouritedPosts.bind(this)
        this.findCrawlerFavouritesPosts = this.findCrawlerFavouritesPosts.bind(this)
        this.ConvertAtSymbolInEmail = this.ConvertAtSymbolInEmail.bind(this)
    }

    componentDidMount() {
        this.findForumFavouritedPosts()
        this.findDocumentationFavouritedPosts()
        this.findCrawlerFavouritesPosts()
        this.findSearchHistory()
    }

    ConvertAtSymbolInEmail(userEmail){return userEmail.replace(/@/g, "%40")}
    async findForumFavouritedPosts() {
        const email = this.ConvertAtSymbolInEmail(this.state.user.email)
        const url = `http://localhost:8080/backend/finduserforumfavourites/${email}`;
        const data = await fetch(url)
        const dataJson = await data.json();
        this.setState({
            forumFavouritesLoading: false,
            forumFavourites: dataJson
        })
    }
    async findDocumentationFavouritedPosts() {
        const email = this.ConvertAtSymbolInEmail(this.state.user.email)
        const url = `http://localhost:8080/backend/finduserdocumentationfavourites/${email}`;
        const data = await fetch(url)
        const dataJson = await data.json();
        this.setState({
            documentationFavouritesLoading: false,
            documentationFavourites: dataJson
        })
    }
    async findCrawlerFavouritesPosts() {
        const email = this.ConvertAtSymbolInEmail(this.state.user.email)
        const url = `http://localhost:8080/backend/findusercrawleritemfavourites/${email}`;
        const data = await fetch(url)
        const dataJson = await data.json();
        console.log(dataJson)
        this.setState({
            crawlerFavouritesLoading: false,
            crawlerFavourites: dataJson
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
                <div className={"favourites-section"}>
                    <h1 className={"title"}>Favourited results: </h1>
                    <h2>Error Forum Favourites: </h2>
                    {this.state.forumFavouritesLoading ? null :
                        this.state.forumFavourites.map((favourite)=> {
                            return <RenderForumFavourites key={favourite.postid.postid} favourite={favourite}/>
                        })}
                    <h2>Documentation Favourites: </h2>
                    {this.state.documentationFavouritesLoading ? null :
                        this.state.documentationFavourites.map((favourite)=>{
                            return <RenderDocumentationFavourites key={favourite.documentationid.documentationid} favourite={favourite}/>
                        })}
                    <h2>Crawler Favourites: </h2>
                    {this.state.crawlerFavouritesLoading ? null :
                        this.state.crawlerFavourites.map((favourite)=>{
                            return <RenderCrawlerFavourites key={favourite.linkid.linkid} favourite={favourite}/>
                        })}
                </div>

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
