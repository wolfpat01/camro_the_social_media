import React from "react";
import { getPostData } from "../helpers/serverHandler"

import User from "./user";
import PostData from "./postData"
import "../../css/post.css"




const darky = "pannelDark";
const lighty = "bg-info";


class Post extends React.Component {
    constructor() {
        super()
        this.state = {
            postData: {
                userToken: "token",
                postText: "loading..",
                postTitle: "Loading.."
            }

        }
        this.state.firstTime = true
        //setInterval(() => this.getPostDetails(), 20000)
    }
    getPostDetails() {
        getPostData(this.props.token || "token").then((res) => JSON.parse(res)).then((postData) => this.setState({ postData }))
    }
    firsttimer() {

        if (this.state.firstTime) { console.log("yee"); this.state.firstTime = false }
    }
    render() {
        this.getPostDetails();
        this.firsttimer()

        let postToken = ""
        let pannelColor = this.props.darkTheme ? darky : lighty;

        return <div className={pannelColor + " col-12 postMain"}>
            <User token={this.state.postData.userToken} darkTheme={this.props.darkTheme}></User>

            <div className="postback">
                <PostData postToken={postToken} darkTheme={this.props.darkTheme}
                    postTitle={this.state.postData.postTitle}
                    postText={this.state.postData.postText}></PostData>
            </div>

        </div>
    }
}

export default Post