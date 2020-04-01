import Estatus from "../Estatus";

export default class PriorityNode{

    currPos = 0

    constructor() {
        this.currPos = -1
        this.children = []
    }

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

    execute(node) {
        if (this.currPos !== -1) { // 存在节点
            const status = this.children[this.currPos].execute(node)
            if (status === Estatus.RUNNING) {
                return Estatus.RUNNING
            } else {
                if (status === Estatus.SUCCESS) {
                    this.currPos = -1
                    return Estatus.SUCCESS
                } else if (status === Estatus.FAILURE) {
                    this.currPos++
                    if (this.currPos === this.children.length) {
                        this.currPos = -1
                        return Estatus.FAILURE
                    }
                }
            }
        } else { // 没有节点
            this.init(node)
            this.currPos = 0
        }
        if (this.currPos.length === 0) {
            return Estatus.SUCCESS
        }
        let currNode = this.children[this.currPos]
        let status = null
        while ((status = currNode.execute(node)) === Estatus.FAILURE) {
            this.currPos++
            if (this.currPos === this.children.length) {
                this.currPos = -1
                return Estatus.FAILURE
            }
            currNode = this.children[this.currPos]
        }
        return status
    }
}