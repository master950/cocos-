import Estatus from "../Estatus";

export default class ProbilityNode{

    currNode = null //当前节点
    totalSum = 0 // 当前所有子节点的权值总和
    weightMap = new Map() // 权值map

    constructor() {
        this.children = []
    }

    init(node) { // 初始化所有子节点
        this.currNode = null
        for (const n of this.children) {
            n.init(node)
        }
    }

    addChild(node, weight) {
        if (weight) {
            this.weightMap.set(node, weight)
            this.totalSum += weight
        } else {
            this.weightMap.set(node, 1)
            this.totalSum += 1
        }
        this.children.push(node)
        return this
    }

    execute(node) {
        if (this.currNode) {
            const status = this.currNode.execute(node)
            if (status !== Estatus.RUNNING) {
                this.currNode = null
                return status
            }
        }
        let chosen = Math.floor(Math.random() * 100)
        let sum = 0
        this.weightMap.forEach((val, key) => {
            sum += val
            if (sum >= chosen) {
                const state = key.execute(node)
                if (state === Estatus.RUNNING) {
                    this.currNode = key
                } else {
                    this.currNode = null // 重置
                }
                return state
            }
        })
        return null // 不满足条件---》不执行，返回null
    }
}