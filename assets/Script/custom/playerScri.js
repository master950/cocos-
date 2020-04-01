import CAnimate from '../common/animateManager'
import Check from '../common/check'

cc.Class({
    extends: cc.Component,

    properties: {
        HP: 100,
        cAnimate: null,
        isDead: false,
        rigid: null,
        jumpLevel: 0,
        isBigger: false,
        isJump: false,
        isAttract: false,
        HPBar: cc.ProgressBar
    },

    // LIFE-CYCLE CALLBACKS:

    start() {
        this.cAnimate = new CAnimate(this.node, this.callFunc)
        this.cAnimate.playAnimation('run')
        this.check = new Check()
        this.registerEvent()
        this.rigid = this.node.getComponent(cc.RigidBody)
    },

    registerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, res => {
            let anim = this.cAnimate.getAnimateStatus()
            this.isJump = true
            if (anim.name === 'jump') {
                let isPlay = anim.state ? anim.state.isPlaying : false
                if (!isPlay) {
                    this.playerJump()
                }
            } else {
                this.playerJump()
            }
        })
    },

    playerJump() {
        if (this.jumpLevel < 2) {
            let impulse = cc.v2(10, 280)
            if (this.isBigger) impulse = cc.v2(10*4, 320*4)
            this.rigid.applyLinearImpulse(impulse, this.node.position)
            this.jumpLevel++
        } 
    },

    doAttract() { // ��������
        const rect = new cc.rect(this.node.x,this.node.y, 800, 800)
        let collider = this.check.checkRect(rect, this.node)
        collider.forEach(item => {
            let scri = item.node.getComponent(item.node.name)
            if (scri && scri.tools) {
                item.node.setParent(this.node.parent)
                scri.moveToTar(this.node)
            }
        })
    },

    fall() {
        if (this.isJump) {
            let impulse = cc.v2(0, 280)
            if (this.isBigger) impulse = cc.v2(0, 320 * 4)
            this.rigid.applyLinearImpulse(impulse, this.node.position)
        }
    },

    doHPCalculate(attack,status) {
        console.log('this', this)
        let progress = this.HPBar.progress
        if (status) {
            progress += attack / 100
        } else {
            progress -= attack / 100
        }
        if (progress > 1) progress = 1
        this.HPBar.progress = progress
        if (progress < 0) {
            const scene = this.node.getParent().getComponent('mainScene')
            scene.isGameOver = true
        }
    },

    onBeginContact(res) { // ��ײ��ʼ
        if (this.jumpLevel === 2 || this.jumpLevel === 1) {
            this.jumpLevel = 0
        }
        this.isJump = false
    },

    callFunc() { // �����ص�
        this.playAnimation('run')
    },

    lateUpdate(dt) {
        if (this.isJump) {
            if (this.rigid.linearVelocity.y > 0) {
                this.cAnimate.playAnimation('jumpUp')
            } else {
                this.cAnimate.playAnimation('jumpDown')
            }
        }
        if (this.isAttract) {
            this.doAttract()
        }
    }
})
