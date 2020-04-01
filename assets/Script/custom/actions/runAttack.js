import config from "../../common/config";
import Estatus from "../../behaviorTree/Estatus";

const maxRight = config.width / 2
const maxLeft = - (config.width / 2) 

export default class RunAttack {

    constructor(target) {
        this.target = target
    }

    init() { }

    getSpeedTime(point) {
        let disX = Math.abs(point.x - this.target.node.x)
        let disY = Math.abs(point.y - this.target.node.y)
        let second = disX > disY ? disX / 500 : disY / 500
        return second
    }

    execute(node) {
        const promise = new Promise((resolve, reject)=> {
            const pos = this.target.node.position
            const width = this.target.node.width
            const height = this.target.node.height
            let newPos
            if (pos.x <= 0 && pos.x < maxRight) {
                newPos = cc.v2(maxRight - (width + 10), pos.y)
            } else if (pos.x >= 0 && pos.x > maxLeft) {
                newPos = cc.v2(maxLeft + (width + 10), pos.y)
            }
            if (newPos.x > 0) {
                this.target.node.scaleX = -2
            } else {
                this.target.node.scaleX = 2
            }
            let second = this.getSpeedTime(newPos)
            let act = cc.moveTo(second, newPos.x, newPos.y)
            let flipXAction = cc.scaleTo(0.1, -this.target.node.scaleX, this.target.node.scaleY)
            const sequence = cc.sequence([act, flipXAction, cc.callFunc(res => {
                resolve(Estatus.SUCCESS)
            })])
            this.target.node.runAction(sequence)
        })
        return promise
    }
}