import Estatus from "../Estatus";

export default class ProbilityNode{

    currNode = null //��ǰ�ڵ�
    totalSum = 0 // ��ǰ�����ӽڵ��Ȩֵ�ܺ�
    weightMap = new Map() // Ȩֵmap

    constructor() {
        this.children = []
    }

    init(node) { // ��ʼ�������ӽڵ�
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
                    this.currNode = null // ����
                }
                return state
            }
        })
        return null // ����������---����ִ�У�����null
    }
}