import React from "react";
import * as Bootstrap from "react-bootstrap"

import { getUser } from "../helpers/serverHandler"


const white = "whiteText";
const dark = "darkText";

class User extends React.Component {

    constructor() {
        super();
        this.state = { userData: { username: "LOADING..", pfp: "https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg" } };
        setInterval(() => this.getUserDeta(), 20000)

    }
    getUserDeta() {
        if (this.props.token)
            getUser(this.props.token).then(res => JSON.parse(res))
                .then(json => this.setState({ userData: json }));

    }

    render() {
        this.getUserDeta();

        let textColor = !this.props.darkTheme ? dark : white;
        return (
            <div>
                <Bootstrap.Row>
                    <Bootstrap.Col sm="1">
                        <img className="pfp" src={this.state.userData.pfp} alt="Flowers in Chania" />
                    </Bootstrap.Col>
                    <Bootstrap.Col sm="11">
                        <p className={textColor + " username"}>{this.state.userData.username}</p>
                    </Bootstrap.Col>
                </Bootstrap.Row>

            </div>);
    }
}


export default User