import React from "react";
import { getPostData } from "../helpers/serverHandler"

import User from "./user";
import PostData from "./postData"
import "../../css/post.css"

//socket way 
import io from "socket.io-client"


const darky = "pannelDark";
const lighty = "bg-info";


class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            postData: {
                postText: "loading..",
                postTitle: "Loading.."
            }

        }
        this.getPostDataSocketWay();

    }
    getPostDetails(props) {
        getPostData(this.props.token || "token").then((res) => JSON.parse(res)).then((postData) => this.setState({ postData }))
    }

    getPostDataSocketWay() {

        const socket = io("localhost:80");

        socket.emit("postData", { token: this.props.token || "token" })
        socket.on("postData", (postData) => {

            this.setState({ postData: postData })
            //this.state.postData = JSON.parse(postData)

        })


    }
    makeSure() {

        if (this.state.postData.userToken) {
            return <User token={this.state.postData.userToken} darkTheme={this.props.darkTheme}></User>
        } else { return <p>loading..</p> }
    }
    render() {
        //this.getPostDetails();
        let postToken = ""
        let pannelColor = this.props.darkTheme ? darky : lighty;

        return <div className={pannelColor + " col-12 postMain"}>
            {this.makeSure()}
            <div className="postback">
                <PostData postToken={postToken} darkTheme={this.props.darkTheme}

                    postText={this.state.postData.postText}></PostData>

            </div>
            <p>{this.state.postData.date}</p>
        </div>
    }
}

export default Post