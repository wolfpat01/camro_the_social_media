import React from "react";

import * as Bootstrap from "react-bootstrap";

import Post from "./objects/post"
import Poster from "./objects/poster.js"
import { getListPosts } from "./helpers/serverHandler"

import io from "socket.io-client"
class Communitytab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }

        console.log("working with sockets now")
        this.getPostsSocketWay()
    }
    getPosts() {
        getListPosts(this.props.token).then(JSON.parse).then((posts => this.setState({ posts })))
    }
    getPostsSocketWay() {
        const socket = io("localhost:80")
        console.log("working with sockets now")
        socket.emit("gimmeStarter", { token: "token" })
        socket.on("starter", (allPosts) => {
            this.setState({ posts: JSON.parse(allPosts) })

        })
        socket.on("newPost", (newPost) => {
            let old = this.state.posts || []

            old.push(newPost)
            this.setState({ posts: old })
        })

    }

    render() {

        //this.getPosts()
        return <div >
            <Poster token={this.props.token}></Poster>
            news

            {this.renderPosts(this.state.posts)}
        </div>
    }


    renderPosts(postsData) {

        if (!postsData[0]) {
            return <h2>Loading...</h2>
        }
        let loader = postsData.slice().reverse().map((token) => {
            return <Post token={token} key={token} darkTheme={this.props.darkTheme} ></ Post >
        })

        return <Bootstrap.Row>
            {loader}
        </Bootstrap.Row>
    }
}
export default Communitytab