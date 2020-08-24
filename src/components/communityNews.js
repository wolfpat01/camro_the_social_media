import React from "react"

import * as Bootstrap from "react-bootstrap"

import Channel from "./objects/channel"



const serverUrl = "localhost:80"


export default function CommunityTab(props) {
    return <div>
        <Channel {...props} />
    </div>

}
