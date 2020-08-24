import React from "react";
import { GetPostData } from "../helpers/serverHandler"

import User from "../objects/user";
import PostData from "./postData"
import "../../css/post.css"



const darky = "pannelDark";
const lighty = "bg-info";



function makeSureUserExists(options) {
    if (options.userToken) {
        return <User {...options}></User>
    } else { return <p>loading..</p> }
}

export default function Post(props) {
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
