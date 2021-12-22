import React, {Component} from 'react';

export default class ProfileHome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={"profile-page"}>
                Profile: {this.props.user}
            </div>
        );
    }
};
