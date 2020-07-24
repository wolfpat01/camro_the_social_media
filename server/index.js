
const fs = require("fs")
const randomString = require("randomstring")
const port = 4000
const Dir = "server"

const { fetch } = require("node-fetch");
const crypto = require("crypto")
function post(body, postToken) {

    const pageToken = body.pageToken;
    const userToken = body.userToken;
    const title = body.title;
    const content = body.content;


    let path = `${Dir}/data/posts/${postToken}.json`
    let data = {
        "pageToken": pageToken,
        "userToken": userToken,
        "postTitle": title,
        "postText": content
    }
    writeOnFile(path, JSON.stringify(data))


    // add to the default list
    path = `${Dir}/data/listPosts/token.json`
    readFile(path).then((data2) => {
        let data = JSON.parse(data2)
        data.push(postToken)
        writeOnFile(path, JSON.stringify(data))
    })
}
function register(body) {
    const userToken = body.userToken
    const username = body.username;
    const secrets = body.secrets;


    let path = `${Dir}/data/userData/${userToken}.json`
    let data = {
        "username": username,
        "pfp": body.pfp || "https://steamuserimages-a.akamaihd.net/ugc/955209606282075133/86D6BE9BD36DF085E365F8FB8ADA84B7FD0B5B03/",
        "secrets": secrets
    }
    writeOnFile(path, JSON.stringify(data))
}



function readFile(path) {
    return new Promise((solve, reject) => {
        try {
            solve(fs.readFileSync(path, 'utf8'))
        }
        catch  {
            solve("")
        }
    })
}
function writeOnFile(path, data) {

    return new Promise((solve, reject) => {
        try {

            fs.writeFileSync(path, data)
            solve(200)
        }
        catch  {
            solve(300)
        }
    })
}


// socket way
const sockets = require("socket.io")(80)

function getPosts(userToken) {
    let token = userToken;

    return fs.readFileSync(`${Dir}/data/posts/${token}.json`, 'utf8') || "NOT FOUND"

}

sockets.on('connection', socket => {
    socket.on("postData", (args) => {
        socket.emit("postData", getPosts(args.token))
    })
    socket.on("userData", (args) => {
        let token = args.token;
        let data = fs.readFileSync(`${Dir}/data/userData/${token}.json`, 'utf8') || "NOT FOUND"

        socket.emit("userData", { ...JSON.parse(data), secrets: [] })
    })
    socket.on("gimmeStarter", (args) => {
        let token = !args.token === "" ? args.token : "token";

        let data = fs.readFileSync(`${Dir}/data/listPosts/${token}.json`, 'utf8') || fs.readFileSync(`${Dir}/data/listPosts/token.json`, 'utf8')


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
        let dir = `${Dir}/data/userData/`



        // verify if the password is less than 8 digits
        if (data.password.length < 8) {
            socket.emit("message", "sorry but your password has less than 8 characters")

        } else {
            //verify if there is another user with this same user
            checkUserName(data.username, dir).then(() => {
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



function checkLogin(username, password) {
    return checkExistantOfUsername(username).then((data) => checkPassword(data, password))
}
function checkExistantOfUsername(username) {

    const directoryPath = `${Dir}/data/userData/`
    return new Promise((solve, reject) => {
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                reject("folder doesn't exist")
            }
            //listing all files using forEach
            let exits = ''
            files.forEach(file => {
                let data = JSON.parse(fs.readFileSync(`${directoryPath}/${file}`, 'utf8'))
                if (data.username == username) {
                    exits = { ...data, token: file.slice(0, file.length - 5) };
                }
            });
            if (exits !== '') {
                solve(exits)
            } else {
                reject("username is incorrect")
            }
        });
    })
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
function checkUserName(username, directoryPath) {
    return new Promise((solve, reject) => {
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                reject("folder doesn't exist")
            }
            //listing all files using forEach
            let exits = false
            files.forEach(file => {
                let data = JSON.parse(fs.readFileSync(`${directoryPath}/${file}`, 'utf8'))
                if (data.username == username) {
                    exits = true;
                }
            });
            if (exits) {
                reject("sorry this username is used before")
            } else {
                solve()
            }
        });
    })
}
