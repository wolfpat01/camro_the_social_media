import React from "react";
import { getUser } from "../helpers/serverHandler"

import * as Bootstrap from "react-bootstrap";

const white = "whiteText";
const dark = "darkText";
const defaultAvatar = "https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg"

export default function User(props) {
    const [userData, setUserData] = React.useState({ username: "LOADING..", pfp: "/src/assests/avatar.png" })

    React.useEffect(() => {
        getUser(props.token, setUserData, props.onExists)
    })

    let textColor = !props.darkTheme ? dark : white;

    return (
        <div>
            <Bootstrap.Row>
                <Bootstrap.Col sm="1">
                    <img className="pfp" src={userData.pfp} onError={(e) => { e.onerror = null; e.src = defaultAvatar }} alt="Flowers in Chania" />
                </Bootstrap.Col>
                <Bootstrap.Col sm="9">
                    <p className={`${textColor} ${props.additionalCalsses || " "}`} >{userData.username}</p>
                </Bootstrap.Col>
            </Bootstrap.Row>

        </div >)
}
