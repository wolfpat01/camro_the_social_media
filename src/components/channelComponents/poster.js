import React from "react";

import Input from "../style/input"
import { sendPostRequest } from "../helpers/serverHandler"



function handleChange(e, oldV, f) {
    let newV = oldV;
    newV[e.target.name] = e.target.value
    console.log(oldV)
    f(newV)
}



function Poster() {
    const [postData, setPostData] = React.useState({ title: "", content: "" })
    return <div className="row container backposter">

        <div className="col-12 row container discro">
            <br />

            <Input type="text" name="content" className="col-12"
                display="what do think of?"
                onChange={e => handleChange(e, postData, setPostData)}></Input>
        </div>
        <button className="btn btn-primary" onClick={(e) => sendPostRequest(e, postData)}>post</button>
    </div >
}

export default Poster