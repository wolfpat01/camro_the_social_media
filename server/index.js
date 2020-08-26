
const variables = {
    recommended: "recomended",
    users: 'users',
    posts: "posts",
}

const moment = require("moment")

const randomString = require("randomstring")
const port = 80

const crypto = require("crypto")

//
///////////////////// Easy file handleing 
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
//

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
    Data.value[type][data.token] = data

    return wasthere
}

function post(body, postToken) {
    const pageToken = body.pageToken;
    const userToken = body.userToken;
    if (!userToken) return
    const title = body.title;
    const content = body.content;
    const date = moment().format()


    let data = {
        pageToken,
        token: postToken,
        userToken,
        "postTitle": title,
        "postText": content,
        date
    }

    //writeOnFile(path, JSON.stringify(data))
    writeData("posts", data)

    if (!Data.value[variables.recommended]["default"]) {
        Data.value[variables.recommended]["default"] = []
    }
    Data.value[variables.recommended]["default"].push(postToken)
}

function register(body) {
    let salt = randomString.generate(12)
    var hash = crypto.createHash('md5').update(body.password + salt).digest("hex");
    const userToken = randomString.generate(12)
    const username = body.username;
    const secrets = [salt, hash];


    let data = {
        username,
        "pfp": body.pfp || "https://steamuserimages-a.akamaihd.net/ugc/955209606282075133/86D6BE9BD36DF085E365F8FB8ADA84B7FD0B5B03/",
        secrets
    }
    writeData("users", { token: userToken, ...data })
}


function asyncGetData(type, id) {
    return new Promise((solve, reject) => {

        if (!Data.value[type]) {
            Data.value[type] = {}
            reject("no data with that id")

        } else {
            solve(Data.value[type][id])
        }
    })
}

function getData(type, id) {
    try {
        if (!Data.value[type]) {
            Data.value[type] = {}

        }
        return Data.value[type][id]
    } catch (err) {
    }
}


//////////// less code

const sockets = require("socket.io")(port)

console.log(`server is now running on port ${port}`)


function asyncGetUser(token) {
    return asyncGetData(variables.users, token)
}

function asyncGetRecommended(userToken) {
    return asyncGetData(variables.recommended, userToken)
}

function asyncGetPosts(token) {
    return asyncGetData("posts", token).then(asyncDataHandeling)
}

function asyncDataHandeling(data) {
    return new Promise((solve, reject) => {
        let date = moment(data.date);
        let now = moment()

        if (date.isSame(now, 'year')) {
            if (date.isSame(now, 'day')) {
                if (date.isSame(now, 'hour')) {
                    solve({ ...data, date: `${moment(data.date).fromNow("ss")} ago ` })
                    return
                }
            }
        }
        solve({ ...data, date: `posted in ${moment(data.date).fromNow("MMMM Do YYYY")} ` })

    })
}


sockets.on('connection', socket => {

    socket.on("postData", (args) => {
        asyncGetPosts(args.token).then((_data) => {
            socket.emit("postData", _data)
        }).catch("data is not defined")
    })

    socket.on("userData", (args) => {
        let token = args.token;

        asyncGetUser(token).then((data) => {
            socket.emit("userData", { data: { ...data, secrets: [] }, status: (data ? 200 : 500) })
        }).catch(console.log)

    })
    socket.on("gimmeStarter", (args) => {
        let userToken = !args.token === "" ? args.token : "token";
        asyncGetRecommended(userToken).then((data) => {
            socket.emit("starter", data)
        }).catch(asyncGetRecommended("default").then((data) => {
            socket.emit("starter", data)
        }))
    })

    socket.on('submitPost', (postData) => {
        console.log("submited a new post")
        let body = JSON.parse(postData);
        let postToken = randomString.generate(8)
        post(body, postToken)
        sockets.emit("newPost", postToken)
    })

    socket.on("register", data => {
        console.log("yoo", data)
        // abusing
        if (data.password.length < 8 || data.username.length < 8) {
            socket.emit("message", "STOPID")

        } else {
            //verify if there is another user with this same user
            checkUserName(data.username, false, registerRejectionUsername).then(() => {
                // add user
                register(data)
                socket.emit("message", { message: "Registerd SUccessFully!", status: 200 })
            }).catch(message => { socket.emit("message", { message, status: 300 }); console.log(message) })
        }
    })
    socket.on("login", data => {
        checkLogin(data.username, data.password).then((data) => {
            socket.emit("message", { message: "logged in!", token: data.token })
        }).catch((message) => socket.emit("message", { message }))
    })
})

const loginRejectionUsername = "username is incorrect"
const registerRejectionUsername = "username is used before"

function checkLogin(username, password) {
    return checkUserName(username, true, loginRejectionUsername).then((data) => checkPassword(data, password))
}

function checkUserName(username, reverse, rejection) {
    return new Promise((solve, reject) => {
        //listing all files using forEach
        let exits = ''
        readArray(variables.users).forEach(user => {
            if (user.username == username) {
                exits = user;
            }
        });
        if (reverse) {
            if (exits !== '') {
                solve(exits)
            } else {
                reject(rejection)
            }
        } else {
            if (exits === '') {
                solve(exits)
            } else {
                reject(rejection)
            }
        }

    });

}

function checkPassword(data, password) {
    return new Promise((solve, reject) => {
        var hash = crypto.createHash('md5').update(password + data.secrets[1]).digest("hex");
        if (hash == data.secrets[0]) {
            solve(data)
        } else {
            reject("password is incorrect")
        }
    })
}

