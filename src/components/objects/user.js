import React from "react";
import { getUser } from "../helpers/serverHandler"
import defaultAvatar from "../../assests/avatar.png"
import * as Bootstrap from "react-bootstrap";

const white = "whiteText";
const dark = "darkText";


export default function User(props) {
    const [userData, setUserData] = React.useState({ username: "LOADING..", pfp: defaultAvatar })
    React.useEffect(() => {
        getUser(props.token).then(setUserData).catch(console.log)
    }, [props.token])

    let textColor = !props.darkTheme ? dark : white;

    return (
        <div>
            <Bootstrap.Row>
                <Bootstrap.Col sm="1">
                    <img className="pfp" src={userData.pfp} />
                </Bootstrap.Col>
                <Bootstrap.Col sm="9">
                    <p className={`${textColor} ${props.additionalCalsses || " "}`} >{userData.username}</p>
                </Bootstrap.Col>
            </Bootstrap.Row>
        </div >)
}
