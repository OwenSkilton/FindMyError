import React, {Component} from 'react';

export default class ProfileHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    render() {
        console.log(this.state.user)
        return (
            <div className={"profile-page"}>
                Profile: {this.state.user.email}
                <br/>
                <br/>
                <div className={"profile-buttons"}>
                    <a rel="nofollow" data-method="delete" href="/users/sign_out">Sign Out</a>
                </div>
            </div>
        );
    }
};
