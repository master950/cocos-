import Estatus from "../../behaviorTree/Estatus";

export default class FollowPlayer {

    constructor(target,posY,time,isClear) {
        this.target = target
        this.posY = posY
        if (time) this.time = time
        if (isClear) this.isClear = isClear
    }

    init() { }

    getSpeedTime(point) {
        let disX = Math.abs(point.x - this.target.node.x)
        let disY = Math.abs(point.y - this.target.node.y)
        let second = disX > disY ? disX / 500 : disY / 500
        return second
    }

    execute(node) {
        const promise = new Promise((resolve, reject) => {
            const pos = cc.v2(this.target.node.x, this.posY)
            let second = null
            if (this.time) {
                second = this.time
            } else {
                second = this.getSpeedTime(pos)
            }
            const act = cc.moveTo(second, pos.x, pos.y)
            const sequence = cc.sequence(act, cc.callFunc(res => {
                if (this.isClear) {
                    const child = this.target.node.getChildByName('fireAttack')
                    child.removeFromParent()
                }
                resolve(Estatus.SUCCESS)
            }))
            this.target.node.runAction(sequence)
        })
        return promise
    }
}