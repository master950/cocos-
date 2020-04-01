import CAnimate from '../../animateManager'
import config from '../../common/config';

cc.Class({
    extends: cc.Component,

    properties: {
        isJump: false,
        attack: 10,
        isAlive: true
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.rigid = this.node.getComponent(cc.RigidBody)
        this.cAnimate = new CAnimate(this.node, this.callFunc)
    },

    start() {
        this.schedule(this.monsterJump,2)
    },

    monsterJump() {
        if (this.isAlive) {
            this.cAnimate.playAnimation('frogjump')
            let pos
            if (this.node.x > 0) {
                this.node.scaleX = 1
                pos = cc.v2(-200, 280)
            } else {
                this.node.scaleX = -1
                pos = cc.v2(200, 280)
            }
            this.rigid.applyLinearImpulse(pos, this.node.position)
            this.isJump = true
        }
    },

    onBeginContact(res) { // ��ײ��ʼ
        let other = res.colliderA
        if (other.node.name === 'player') {
            let posO = other.node.convertToWorldSpaceAR(other.node.position)
            let posS = this.node.convertToWorldSpaceAR(this.node.position)
            if (Math.abs(posO.x - posS.x) < 50) {
                this.isAlive = false
                this.cAnimate.playAnimation('die')
                this.scheduleOnce(() => {
                    this.node.removeFromParent()
                }, 0.5)
                return
            }
            const player = other.node.getComponent('playerScri')
            let temp
            if (player.isBigger) {
                if (this.node.scaleX > 0) {
                    temp = cc.v2(300, 280)
                } else {
                    temp = cc.v2(-300, 280)
                }
                this.rigid.applyLinearImpulse(temp, this.node.position)
            } else {
                if (this.node.scaleX > 0) {
                    temp = cc.v2(-300, 280)
                } else {
                    temp = cc.v2(300, 280)
                }
                player.rigid.applyLinearImpulse(temp, other.node.position)
            }
            player.doHPCalculate(this.attack)
        }
    },

    callFunc() {
        this.playAnimation('frogidle')
    },

    lateUpdate(dt) {
        if (this.isAlive) {
            this.node.x -= (1 + config.speedLevel)
        }
    }
});
