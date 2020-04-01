export default class checkColider {

    constructor() {
        this.physicManager = cc.director.getPhysicsManager()
        this.manager = cc.director.getCollisionManager()
    }

    checkPoint(point) { // 点检测
        let colider = this.physicManager.testPoint(point) // 返回给定点的碰撞体集合
    }

    checkRect(rect,tarNode) { // 矩阵检测
        let collider = this.physicManager.testAABB(rect) // 返回给定点的碰撞体集合
        return collider
    }

    checkRayCast() { // 射线检测

    }

    openPhysicManager(number) {
        this.physicManager.grivaty = cc.v2(0, number)
        this.physicManager.enabled = true
        this.manager.enabled  = true
      //  this.physicManager.debugDrawFlags = true
    }
}