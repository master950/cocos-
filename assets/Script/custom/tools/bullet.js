import config from "../../common/config";
import PrefabPool from "../prefabPool/prefabPool";

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 300,
        isAlive: true,
        attack: 50
    },

    start () {
        this.parent = this.node.getParent()
        this.prefabPool = new PrefabPool()
    },

    onBeginContact(res) { // ��ײ��ʼ
        this.isAlive = false
        let colliderA = res.colliderA
        let colliderB = res.colliderB
        if (colliderA.node.name === 'player') {
            let player = colliderA.node.getComponent('playerScri')
            player.hp -= this.attack
            this.prefabPool.save(this.node)
        }
    },

    lateUpdate(dt) {
        if (this.isAlive) {
            if (this.parent.scaleX > 0) {
                this.node.rotation = -90
            } else {  
                this.node.rotation = -90
            }
            this.node.x -= this.speed * dt
        }
        if (Math.abs(this.node.x) >= config.width / 2) {
            this.isAlive = false
            this.prefabPool.save(this.node)
        }
    }
});
