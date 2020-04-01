import config from "../../common/config";

cc.Class({
    extends: cc.Component,

    properties: {
        tools: true,
        score: 10,
        isAttract: false
    },

    start() {
       
    },

    getSpeedTime(point) {
        let disX = Math.abs(point.x - this.node.x)
        let disY = Math.abs(point.y - this.node.y)
        let second = disX > disY ? disX / 500 : disY / 500
        return second
    },

    moveToTar(tarNode) {
        this.isAttract = true
        const speed = this.getSpeedTime(tarNode.position)
        let act = cc.moveTo(speed, tarNode.position)
        this.node.runAction(act)
    },

    onBeginContact(res) { // Åö×²¿ªÊ¼
        let colliderA = res.colliderA
        let colliderB = res.colliderB
        if (colliderA.node.name === 'player') {
            let scene = colliderA.node.getParent().getComponent('mainScene')
            scene.score.getComponent(scene.score.name).doLabelChange(this.score)
            this.node.removeFromParent()
        }
    },

    lateUpdate(dt) {
        if (!this.isAttract) {
            this.node.x -= (1 + config.speedLevel)
        }
    }
});
