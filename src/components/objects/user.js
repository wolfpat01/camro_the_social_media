import React from "react";

import io from "socket.io-client"
import * as Bootstrap from "react-bootstrap";

const white = "whiteText";
const dark = "darkText";

const serverUrl = "localhost:80"
const defaultAvatar = "https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg"


function getUserDataSocketWay(token, setUserData) {
    const socket = io(serverUrl);
    if (token)
        socket.emit("userData", { token })

    socket.on("userData", setUserData)
}

function User(props) {
    const [userData, setUserData] = React.useState({ username: "LOADING..", pfp: "/src/assests/avatar.png" })

    React.useEffect(() => {
        getUserDataSocketWay(props.token, setUserData)
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


export default User