import React from "react";
import Title from "../helpers/title.js"
class PostData extends React.Component {
    render() {
        return <div >
            <Title darkTheme={this.props.darkTheme} title={this.props.postTitle}></Title><br />
            <p className="postParagraph">
                {this.props.postText}
            </p>
        </div >
    }
}

export default PostData