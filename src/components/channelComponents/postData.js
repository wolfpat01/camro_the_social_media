import React from "react";
import Title from "../style/title.js"

export default function PostData(props) {
    return <div >
        <Title darkTheme={props.darkTheme} title={props.postTitle}></Title><br />
        <p className="postParagraph">
            {props.postText}
        </p>
    </div >
}
