import Estatus from "../Estatus";

export default class SequenceNode{

    currPos = -1

    constructor() { this.children = [] }

    init(node) {
        this.currPos = -1
        for (const child of this.children) {
            child.init(node)
        }
    }

    addChild(node) {
        this.children.push(node)
        return this
    }

    doRunning(node) {
        const promise = new Promise((resolve, reject)=> {
            if (this.currPos !== this.children.length) {
                this.children[this.currPos].execute(node).then(result => {
                    if (result === Estatus.FAILURE) {
                        this.currPos = -1
                        resolve(Estatus.FAILURE)
                    }
                    if (result === Estatus.SUCCESS) {
                        this.currPos++
                        this.doRunning(node)
                    }
                })
            } else {
                resolve(Estatus.SUCCESS)
            }
        })
        return promise
    }

    execute(node) {
        const promise = new Promise((resolve, reject)=> {
            if (this.currPos === -1) {
                this.init(node)
                this.currPos = 0
            }

            if (this.children.length === 0) {
                resolve(Estatus.SUCCESS)
            }
            this.doRunning(node).then(res => {
                resolve(res)
            })
        })
        return promise
    }
}