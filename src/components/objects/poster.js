import React from "react";
import io from "socket.io-client"
import Cookies from "js-cookie"
import Input from "./input"

const serverUrl = "localhost:80"


function handleChange(e, oldV, f) {
    let newV = oldV;
    newV[e.target.name] = e.target.value
    console.log(oldV)
    f(newV)
}

function sendPostRequest(e, { title, content }) {
    const options = {
        userToken: Cookies.get("userData"),
        title,
        content,
    }

    // socket way 
    const socket = io(serverUrl);
    socket.emit("submitPost", JSON.stringify(options))

    /*
            sendPostRequest(options)
    
            this.props.onPost()
            //e.target.disabled = true;
        */


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