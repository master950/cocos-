import { request } from "https";

class NetHandler {

    isClosed = true
    isLink = false
    respData = ''

    constructor() {
        this.ws = new WebSocket('ws://192.168.1.109:8009/ws')
        this.ws.binaryType = "arraybuffer"
        this.init()
    }

    init() {
        this.ws.onopen = function () {
            this.isLink = true
            this.isClosed = false
            console.log('link success')
        }
        this.ws.onclose = function () {
            this.isClosed = true
            this.isLink = false
            console.log("link close");
        },
        this.ws.onerror = function (e) {
            this.isClosed = true
            this.isLink = false
            console.log("link error", e);
        },
        this.ws.onmessage = function (e) {
            if (roleData.length >= 10) {
                roleData.shift()
                roleData.push(e.data)
            } else {
                roleData.push(e.data)
            }
        }
    }

    sendData(msg) {
        this.ws.send(msg)
    }

}

let singleton = function (func) {
    let req;
    return function () {
        return req || (req = func)
    }
}

module.exports = singleton(new NetHandler())()