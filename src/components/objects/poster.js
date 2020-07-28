import React from "react";
import { sendPostRequest } from "../helpers/serverHandler"
import io from "socket.io-client"
import Cookies from "js-cookie"
import Input from "./input"
class Poster extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "title",
            content: "content"
        }
    }
    sendPostRequest(e) {
        const options = {
            userToken: Cookies.get("userData"),
            title: this.state.title,
            content: this.state.content,
        }

        // socket way 
        const socket = io("localhost:80");
        socket.emit("submitPost", JSON.stringify(options))

        /*
                sendPostRequest(options)
        
                this.props.onPost()
                //e.target.disabled = true;
            */


    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return <div className="row container backposter">

            <div className="col-12 row container discro">
                <br />

                <Input type="text" name="content" className="col-12"
                    display="what do think of?"
                    onChange={e => this.handleChange(e)}></Input>
            </div>
            <button className="btn btn-primary" onClick={(e) => this.sendPostRequest(e)}>post</button>
        </div >
    }
}

export default Poster