import React from "react";

import * as Bootstrap from "react-bootstrap";

import Post from "./objects/post"
import Poster from "./objects/poster.js"
import { getListPosts } from "./helpers/serverHandler"


class Communitytab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }


    }
    getPosts() {
        getListPosts(this.props.token).then(JSON.parse).then((posts => this.setState({ posts })))
    }
    render() {

        this.getPosts()
        return <div >
            <Poster token={this.props.token} onPost={() => this.getPosts()}></Poster>
            news

            {this.renderPosts(this.state.posts)}
        </div>
    }
    bind(fun) {
        return fun.bind(this)
    }
    renderPosts(postsData) {
        if (!postsData[0]) {
            return <h2>Loading...</h2>
        }

        let loader = postsData.slice().reverse().map((token, i) => {
            return <Post token={token} key={i} darkTheme={this.props.darkTheme} ></ Post >
        })

        return <Bootstrap.Row>
            {loader}
        </Bootstrap.Row>
    }
}
export default Communitytab