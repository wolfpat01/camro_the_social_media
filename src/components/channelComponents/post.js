import React from "react";
import { GetPostData } from "../helpers/serverHandler"

import User from "../objects/user";
import PostData from "./postData"
import "../../css/post.css"



const darky = "pannelDark";
const lighty = "bg-info";



function makeSureUserExists(options) {
    let data = options;
    data.token = options.userToken
    if (options.userToken) {
        return <User {...data}></User>
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
    }, [props.token])
    let pannelColor = props.darkTheme ? darky : lighty;

    return <div className={pannelColor + " col-12 postMain"}>
        {makeSureUserExists({ darkTheme: props.darkTheme, ...postData })}
        <div className="postback">
            <PostData postToken={postData.token} darkTheme={props.darkTheme}

                postText={postData.postText}></PostData>

        </div>
        <p>{postData.date}</p>
    </div>
}
