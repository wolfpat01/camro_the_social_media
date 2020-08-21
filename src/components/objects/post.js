import React from "react";
import { getPostData } from "../helpers/serverHandler"

import User from "./user";
import PostData from "./postData"
import "../../css/post.css"

//socket way 
import io from "socket.io-client"


const darky = "pannelDark";
const lighty = "bg-info";

const serverUrl = "localhost:80"


function GetPostData(token) {
    return new Promise((solve, reject) => {
        const socket = io(serverUrl);

        socket.emit("postData", { token: token || "token" })
        socket.on("postData", solve)
    })

}
function makeSureUserExists(options) {
    if (options.userToken) {
        return <User {...options}></User>
    } else { return <p>loading..</p> }
}

function Post(props) {
    let [postData, setPostData] = React.useState({
        postText: "loading..",
        postTitle: "Loading..",
        date: "loading.."
    })

    // setting post data
    React.useEffect(() => {
        GetPostData(props.token).then(setPostData)
    })

    //this.getPostDetails();
    let postToken = ""
    let pannelColor = props.darkTheme ? darky : lighty;

    return <div className={pannelColor + " col-12 postMain"}>
        {makeSureUserExists({ darkTheme: props.darkTheme, ...postData })}
        <div className="postback">
            <PostData postToken={postToken} darkTheme={props.darkTheme}

                postText={postData.postText}></PostData>

        </div>
        <p>{postData.date}</p>
    </div>
}



export default Post