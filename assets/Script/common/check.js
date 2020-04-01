export default class checkColider {

    constructor() {
        this.physicManager = cc.director.getPhysicsManager()
        this.manager = cc.director.getCollisionManager()
    }

    checkPoint(point) { // ����
        let colider = this.physicManager.testPoint(point) // ���ظ��������ײ�弯��
    }

    checkRect(rect,tarNode) { // ������
        let collider = this.physicManager.testAABB(rect) // ���ظ��������ײ�弯��
        return collider
    }

    checkRayCast() { // ���߼��

    }

    openPhysicManager(number) {
        this.physicManager.grivaty = cc.v2(0, number)
        this.physicManager.enabled = true
        this.manager.enabled  = true
      //  this.physicManager.debugDrawFlags = true
    }
}