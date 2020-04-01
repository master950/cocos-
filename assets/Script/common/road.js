import config from './config'
export default class RoadControl {

    constructor(tarNode) {
        this.node = tarNode
        this.isOverFlow = false
    }

    initData(needStep) {
        let parentNode = this.node.getParent()
        this.comps = parentNode.getComponent('mainScene')
        this.scri = this.node.getComponent(this.node.name)
        if (needStep) {
            this.node.width = config.roadWidth - config.roadStep
        } else {
            this.node.width = config.roadWidth
        }
        this.initColider()
    }

    initColider() { // ��Ӧ��ײ����Χ
        let collider = this.node.getComponent(cc.PhysicsBoxCollider)
        collider.size.width = this.node.width
        collider.size.height = this.node.height
        collider.apply()
    }

    testOverflow() { // �������
        if (!this.isOverFlow) {
            this.node.x -= (1 + config.speedLevel)
            let absX = this.node.x
            let half = config.width / 2
            if (absX < -half) {
                this.comps.needCreate = true
                if (absX <= -half - config.roadWidth) {
                    this.node.walk(target => {
                        this.scri.scorePool.put(target)
                    })
                    this.node.removeFromParent()
                    this.comps.allBoard.shift()
                    this.isOverFlow = true
                }
            }
        }
    }
    
}
