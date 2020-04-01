import Estatus from "../Estatus";

export default class RepeatNode{

    count = 0 //重复次数
    limitCount = 0 // 限制重复次数

    constructor(limit) {
        this.limitCount = limit
        this.children = []
    }

    addChild(node) {
        if (this.children.length === 0) {
            this.children.push(node)
        } else {
            console.log('only one child')
        }
        return this
    }

    execute(node) {
        const promise = new Promise((resolve, reject)=> {
            if (this.children.length === 0) {
                return Estatus.SUCCESS
            } else {
                const status = this.children[0].execute(node)
                if (status === Estatus.SUCCESS) {
                    this.count++
                    if (count === this.limitCount) {
                        this.init(node)
                        resolve(Estatus.SUCCESS)
                    } else {
                        resolve(Estatus.RUNNING)
                    }
                }
                resolve(status)
            }
        })
        return promise
    }

    init(node) {
        if (this.children.length === 1) {
            this.children[0].init(node)
        }
        this.count = 0
    }

}