import React from "react";

import * as Bootstrap from "react-bootstrap";

import Post from "../channelComponents/post"
import Poster from "../channelComponents/poster.js"
import { getPost } from "../helpers/serverHandler"



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

function view(props, postsData, viewMod) {
    switch (viewMod) {
        case 1:
            return <div>
                {renderPosts(postsData, props.darkTheme)}

                <Poster token={props.token}></Poster>
            </div>
            break;

        default:
            return <div>
                <Poster token={props.token}></Poster>

                {renderPosts(postsData, props.darkTheme)}
            </div>
            break;
    }
}



export default function Channel(props) {

    const [postsData, setPostsData] = React.useState([])
    const [viewMod, setViewMod] = React.useState(props.viewMod || 0)

    React.useEffect(() => {
        getPost(postsData, setPostsData)
    })

    return view(props, postsData, viewMod)
}
