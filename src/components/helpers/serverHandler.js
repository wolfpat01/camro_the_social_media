
const fetch = require("node-fetch")
const querystring = require("querystring")

class DevTo {
    constructor(config) {
        this.api_key = config.api_key
        this.basePath = "http://localhost:4000/"
    }

    request(endpoint = "", options = {}) {

        let url = this.basePath + endpoint

        let headers = {
            'api_key': this.api_key,
            'Content-type': 'application/json'
        }

        let config = {
            ...options,
            ...headers
        }


        return fetch(url, config).then(r => {

            if (r.ok) {

                return r.json()
            }
            console.log("not ok")
        })
    }

    getUser(options) {
        let qs = options ? "?" + querystring.stringify(options) : ""

        let url = "user" + qs
        let config = {
            method: 'GET'
        }
        return this.request(url, config)
    }
    getPostData(options) {
        let qs = options ? "?" + querystring.stringify(options) : ""

        let url = "posts" + qs
        let config = {
            method: 'GET'
        }
        return this.request(url, config)
    }
    getPostList(options) {
        let qs = options ? "?" + querystring.stringify(options) : ""

        let url = "listPosts" + qs
        let config = {
            method: 'GET'
        }
        return this.request(url, config)
    }
    sendPostRequest(options) {
        let qs = options ? "?" + querystring.stringify(options) : ""

        let url = "post" + qs
        let config = {
            method: 'POST'
        }

        return this.request(url, config)
    }
}

const api = new DevTo({
    api_key: "xxxxxxxxx"
})
const getUser = (token) => {
    const options = {
        token
    }

    return api.getUser(options)
}
const getPostData = (token) => {
    const options = {
        token
    }

    return api.getPostData(options)
}
const getListPosts = (token) => {
    const options = {
        token
    }

    return api.getPostList(options)
}
const sendPostRequest = (options) => {

    return api.sendPostRequest(options)
}

export { getUser, getPostData, getListPosts, sendPostRequest }
