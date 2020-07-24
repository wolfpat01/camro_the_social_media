import React from "react"
import "../../css/input.css"
class Input extends React.Component {
    constructor(props) {
        super(props)
    }
    onChange(e) {
        try {
            this.props.onChange(e)
        } catch{ }
    }

    render() {

        return (<React.Fragment>
            <div className="group">
                <input type={this.props.type || "text"} name={this.props.name} className="inputfeild" onChange={(e) => this.onChange(e)} required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>{this.props.display}</label>
            </div>
        </React.Fragment>)


    }
}
export default Input