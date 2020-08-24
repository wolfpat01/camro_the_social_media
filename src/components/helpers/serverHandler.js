import io from "socket.io-client"
import Cookies from "js-cookie"


const language = {
    register: "register",
    the_username_is_too_short: "the username is too short",
    the_password_is_too_short: "the password is too short",


    password_is_not_confirmed: "password is not confirmed",

}

const serverUrl = "localhost:80"

const socket = io(serverUrl);

export function GetPostData(token) {
    return new Promise((solve, reject) => {


        socket.emit("postData", { token: token || "token" })
        socket.on("postData", solve)
    })

}


export function getPost(postsData, setPostsData) {
    socket.emit("gimmeStarter", { token: "token" })
    socket.on("starter", setPostsData)
    socket.on("newPost", (newPost) => {
        let posts = postsData || []
        posts.push(newPost)
        setPostsData(posts)
    })

}

export function sendPostRequest(e, { title, content }) {
    const options = {
        userToken: Cookies.get("userData"),
        title,
        content,
    }
    socket.emit("submitPost", JSON.stringify(options))
}

export function getUser(token, setUserData, onExists = () => { }) {
    if (token)
        socket.emit("userData", { token })

    socket.on("userData", ({ data, status }) => {
        if (status == 200) {
            onExists(data)
            setUserData(data)
        } else {

        }
    })
}



/**this function for submiting login to server
 * @prop {options} -setMessage, loginData{username, password}
 */
export function submitLogin(options) {
    const { setMessage, loginData } = options

    let socket = io(serverUrl)
    socket.emit("login", loginData)
    socket.on("message", ({ message, token }) => {
        setMessage(message)
        if (token) {
            Cookies.set("userData", { message, token });
            console.log("loggedin")
        }
    })
}

/**this function for submiting register to server
 * @prop {options} -username, password, verifyPassword, setMessage, pfp, setdisabledRegister
 */
export function submitRegister(setMessage, options) {

    const { registerData, setRedirected } = options
    const { username, password, pfp, verifyPassword } = registerData

    if (username.length < 8) {

        setMessage(language.the_username_is_too_short)
        return
    }
    if (verifyPassword != password) {

        setMessage(language.password_is_not_confirmed)
        return
    }
    if (password.length < 8) {

        setMessage(language.the_password_is_too_short)
        return
    }
    socket.emit("register", { username, password, pfp })

    socket.on("message", ({ message, status }) => {
        if (status === 200) {
            setMessage(message)
            // redirect to main


        } else {
            setMessage(message)
        }
    })
    socket.disconnect();
}
