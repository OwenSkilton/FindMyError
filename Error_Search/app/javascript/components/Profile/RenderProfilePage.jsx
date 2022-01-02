import React from 'react';

const RenderProfilePage = ({user}) => {
    return (
        <div className={"profile-section"}>
            {user.email}
            <div className={"profile-buttons"}>
                <a className={"sign-out-button"} rel="nofollow" data-method="delete" href="/users/sign_out">Sign Out</a>
            </div>
        </div>
    );
};

export default RenderProfilePage;
