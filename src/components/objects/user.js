import React from "react";
import * as Bootstrap from "react-bootstrap"

import { getUser } from "../helpers/serverHandler"

import io from "socket.io-client"



const white = "whiteText";
const dark = "darkText";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = { userData: { username: "LOADING..", pfp: "https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg" } };
        this.getUserDataSocketWay()

    }
    getUserDeta() {

        getUser(this.props.token).then(res => JSON.parse(res))
            .then(json => this.setState({ userData: json }));

    }
    getUserDataSocketWay() {
        const socket = io("localhost:80");
        if (this.props.token)
            socket.emit("userData", { token: this.props.token })
        socket.on("userData", (userData) => {
            this.setState({ userData: userData })
            //this.state.postData = JSON.parse(userData)
        })
    }

    render() {
        //this.getUserDeta();

        let textColor = !this.props.darkTheme ? dark : white;
        return (
            <div>
                <Bootstrap.Row>
                    <Bootstrap.Col sm="1">
                        <img className="pfp" src={this.state.userData.pfp} alt="Flowers in Chania" />
                    </Bootstrap.Col>
                    <Bootstrap.Col sm="9">
                        <p className={`${textColor} ${this.props.additionalCalsses || " "}`} >{this.state.userData.username}</p>
                    </Bootstrap.Col>
                </Bootstrap.Row>

            </div >);
    }
}


export default User