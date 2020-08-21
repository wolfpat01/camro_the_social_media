import React from "react";

import * as Bootstrap from "react-bootstrap";

import Post from "./objects/post"
import Poster from "./objects/poster.js"
import { getListPosts } from "./helpers/serverHandler"

import io from "socket.io-client"

const serverUrl = "localhost:80"

function getPostsSocketWay(postsData, setPostsData) {
    const socket = io(serverUrl)

    socket.emit("gimmeStarter", { token: "token" })
    socket.on("starter", setPostsData)
    socket.on("newPost", (newPost) => {
        let posts = postsData || []
        posts.push(newPost)
        setPostsData(posts)
    })

}

function renderPosts(postsData, darkTheme) {

    if (!postsData[0]) {
        return <h2>Loading...</h2>
    }
    let loader = postsData.slice().reverse().map((token) => {

        return <Post token={token} key={token} darkTheme={darkTheme} ></ Post >
    })

    return <Bootstrap.Row>
        {loader}
    </Bootstrap.Row>
}

function CommunityTab(props) {

    const [postsData, setPostsData] = React.useState([])

    React.useEffect(() => {
        getPostsSocketWay(postsData, setPostsData)
    })

    return <div >
        <Poster token={props.token}></Poster>
    news

    {renderPosts(postsData, props.darkTheme)}
    </div>
}

export default CommunityTab