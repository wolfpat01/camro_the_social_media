
const variables = {
    recommended: "recomended",
    users: 'users',
    posts: "posts",
}



const fs = require("fs")
const randomString = require("randomstring")
const port = 4000
const Dir = "server"

const { fetch } = require("node-fetch");
const crypto = require("crypto")

// Easy file handleing 
const { LocaleDb } = require('informa-db.js')
const path = 'server/data.json'

const Data = new LocaleDb({ path, defaultStr: {} })
Data.saveOnChange = true
if (!Data.value) {
    Data.value = {}
}
Object.values(variables).forEach((vari) => {

    if (!Data.value[vari]) {
        Data.value[vari] = {}
    }
})
//////////////////////

function readArray(type) {
    return Object.values(Data.value[type])
}

function writeData(type, data) {
    let wasthere = true

    if (!Data.value[type]) {
        Data.value[type] = {}
        wasthere = false
        console.log("yepish")
    }
    console.log("yep")
    Data.value[type][data.token] = data

    return wasthere
}
function getData(type, id) {

    if (!Data.value[type]) {
        Data.value[type] = {}

    }
    return Data.value[type][id]
}


function post(body, postToken) {
    const pageToken = body.pageToken;
    const userToken = body.userToken;
    const title = body.title;
    const content = body.content;



    let data = {
        "pageToken": pageToken,
        "userToken": userToken,
        "postTitle": title,
        "postText": content
    }

    //writeOnFile(path, JSON.stringify(data))
    writeData("posts", { token: postToken, ...data })

    if (!Data.value[variables.recommended]["default"]) {
        Data.value[variables.recommended]["default"] = []
    }
    Data.value[variables.recommended]["default"].push(postToken)
}
function register(body) {
    const userToken = body.userToken
    const username = body.username;
    const secrets = body.secrets;


    let data = {
        username,
        "pfp": body.pfp || "https://steamuserimages-a.akamaihd.net/ugc/955209606282075133/86D6BE9BD36DF085E365F8FB8ADA84B7FD0B5B03/",
        secrets
    }


    writeData("users", { token: userToken, ...data })
}

// socket way
const sockets = require("socket.io")(80)

function getPosts(userToken) {
    let token = userToken;

    return getData("posts", token)//fs.readFileSync(`${Dir}/data/posts/${token}.json`, 'utf8') || "NOT FOUND"

}

sockets.on('connection', socket => {
    socket.on("postData", (args) => {
        socket.emit("postData", getPosts(args.token))
    })
    socket.on("userData", (args) => {
        let token = args.token;

        let data = getData("users", token)
        socket.emit("userData", { ...data, secrets: [] })
    })
    socket.on("gimmeStarter", (args) => {
        let token = !args.token === "" ? args.token : "token";

        let data = getData(variables.recommended, token)
        if (!data) data = getData(variables.recommended, "default")

        if (data)
            socket.emit("starter", data)
    })

    socket.on('submitPost', (postData) => {
        let body = JSON.parse(postData);
        let postToken = randomString.generate(8)
        post(body, postToken)
        sockets.emit("newPost", postToken)
    })

    socket.on("register", data => {
        let salt = randomString.generate(12)
        var hash = crypto.createHash('md5').update(data.password + salt).digest("hex");
        let userToken = randomString.generate(12)


        // verify if the password is less than 8 digits
        if (data.password.length < 8) {
            socket.emit("message", "sorry but your password has less than 8 characters")

        } else {
            //verify if there is another user with this same user
            checkUserName(data.username, registerRejectionUsername).then(() => {
                // add user
                register({ username: data.username, userToken, pfp: data.pfp, secrets: [hash, salt] })
                socket.emit("message", { message: "Registerd SUccessFully!", status: 200 })
            }).catch(message => socket.emit("message", { message, status: 300 }))
        }
    })
    socket.on("login", data => {
        checkLogin(data.username, data.password).then((data) => {
            socket.emit("message", { message: "logged in!", token: data.token })
        }).catch((message) => socket.emit("message", { message }))
    })
})

const loginRejectionUsername = "username is incorrect"
const registerRejectionUsername = "username is incorrect"
function checkLogin(username, password) {
    return checkUserName(username, loginRejectionUsername).then((data) => checkPassword(data, password))
}

function checkUserName(username, rejection) {
    return new Promise((solve, reject) => {
        //listing all files using forEach
        let exits = ''
        readArray(variables.users).forEach(user => {
            if (user.username == username) {
                exits = user;
            }
        });
        if (exits !== '') {
            solve(exits)
        } else {
            reject(rejection)
        }
    });

}

function checkPassword(data, password) {
    return new Promise((solve, reject) => {
        var hash = crypto.createHash('md5').update(password + data.secrets[1]).digest("hex");
        if (hash === data.secrets[0]) {
            solve(data)
        } else {
            reject("password is incorrect")
        }
    })
}

