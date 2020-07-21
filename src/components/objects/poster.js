import React from "react";
import { sendPostRequest } from "../helpers/serverHandler"
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
            userToken: this.props.token,
            title: this.state.title,
            content: this.state.content
        }

        sendPostRequest(options)

        this.props.onPost()
        //e.target.disabled = true;


    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return <div className="row container">
            <div className="col-12 row container">
                <h4 className="col-lg-2 col-12">title:</h4> <input type="text" name="title" className="col-10"

                    onChange={e => this.handleChange(e)}></input>
            </div>
            <div className="col-12 row container discro">
                <h4 className="col-12">discription:</h4><input type="text" name="content" className="col-12"

                    onChange={e => this.handleChange(e)}></input>
            </div>
            <button onClick={(e) => this.sendPostRequest(e)}>post</button>
        </div >
    }
}

export default Poster