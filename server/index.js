
const fs = require("fs")
const randomString = require("randomstring")
const port = 4000
const Dir = "server"




var express = require("express");
var cors = require('cors');
const morgan = require('morgan');


var corsOptions = {
    origin: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var app = express().use("*", cors(corsOptions)).use(morgan("combined")).use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get("/user", (req, res, next) => {

    let token = req.query.token;

    let data = fs.readFileSync(`${Dir}/data/userData/${token}.json`, 'utf8') || "NOT FOUND"

    res.status(200).json(data)
})

app.get("/posts", (req, res, next) => {
    let token = req.query.token;

    let data = fs.readFileSync(`${Dir}/data/posts/${token}.json`, 'utf8') || "NOT FOUND"

    res.status(200).json(data)
})

app.get("/listPosts", (req, res, next) => {
    let token = !req.query.token == "" ? req.query.token : "token";

    let data = fs.readFileSync(`${Dir}/data/listPosts/${token}.json`, 'utf8') || fs.readFileSync(`${Dir}/data/listPosts/token.json`, 'utf8')


    res.status(200).json(data)
})

app.post("/post", (req, res, next) => {
    let token = req.query.token;

    post(req.query)
})

function post(body) {
    const pageToken = body.pageToken;
    const userToken = body.userToken;
    const title = body.title;
    const content = body.content

    let postToken = randomString.generate(8)

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