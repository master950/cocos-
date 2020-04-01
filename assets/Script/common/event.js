import Effect from './effect'
import request from './request'
export default class CustomEvent {

    tarPos = null
    lastPos = null
    degree = null
    effect = null
    startPos = null
    timeInterval = null
    diffX = null
    diffY = null

    constructor() {
        this.effect = new Effect()
    }
    // 普通单击
    btnClick(tarNode,callback) {
        tarNode.on(cc.Node.EventType.TOUCH_START, res => {
            this.effect.play('pressUp', tarNode, 0.1)
        })
        tarNode.on(cc.Node.EventType.TOUCH_END, res => {
            if (typeof callback === 'function') {
                this.effect.play('pressDown', callback)
            } else {
                this.effect.play('pressDown', callback[0][callback[1]].call(callback[0]))
            }
        })
    }

    touchMove(tarNode, moveNode) {
        tarNode.on(cc.Node.EventType.TOUCH_START, res => {
            let point = res.getLocation()
            this.startPos = tarNode.convertToWorldSpaceAR(cc.v2(0,0))
            this.tarPos = point
            this.doRunning(moveNode)
        })
        tarNode.on(cc.Node.EventType.TOUCH_MOVE, res => {
            const point = res.getLocation()
            this.diffX = point.x - this.tarPos.x
            this.diffY = point.y - this.tarPos.y
            this.lastPos = point
        })
        tarNode.on(cc.Node.EventType.TOUCH_END, res => {
            clearInterval(this.timeInterval)
            this.tarPos = null
            this.lastPos = null
            this.timeInterval = null
            this.diffX = null
            this.diffY = null
        })
    }

    doRunning(moveNode) {
        this.timeInterval = setInterval(() => {
            if (this.lastPos) {
                this.getAngle(this.lastPos)
                if (this.diffX > 0) {
                    if (this.degree <= 90) {
                        moveNode.x += 1 - this.degree / 90
                        moveNode.y -= this.degree / 90
                    } else {
                        moveNode.x += 1 - (this.degree - 90) / 90
                        moveNode.y += (this.degree - 90) / 90
                    } 
                } else {
                    if (this.degree <= 90) {
                        moveNode.x -= this.degree / 90
                        moveNode.y -= 1 - this.degree / 90
                    } else {
                        moveNode.x -= 1 - (this.degree - 90) / 90
                        moveNode.y += (this.degree - 90) / 90
                    } 
                }
            }
        }, 10)
    }

    getAngle(point) {
        let dirVec = point.sub(this.startPos) //获得从startPos指向endPos的方向向量
        let comVec = new cc.Vec2(0, -80) //计算夹角的参考方向，这里选择x轴正方向
        let radian = dirVec.signAngle(comVec) //获得带方向的夹角弧度值(参考方向顺时针为正值，逆时针为负值)
        this.degree = Math.abs(Math.floor(cc.misc.radiansToDegrees(radian)))
    }

    rigisterAllBtn(clickMap) {
        for (let item of clickMap.entries()) {
            this.btnClick(item[0],item[1])
        }
    }

}