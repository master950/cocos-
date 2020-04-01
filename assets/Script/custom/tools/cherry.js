import Skill from '../../common/skill'
import config from '../../common/config';

cc.Class({
    extends: cc.Component,

    properties: {
        tools: true,
        HP: 30,
        isAttract: false
    },

    start () {
        this.skill = new Skill()
    },

    moveToTar(tarNode) {
        this.isAttract = true
        let act = cc.moveTo(2, tarNode.position)
        this.node.runAction(act)
    },

    onBeginContact(res) { // ��ײ��ʼ
        let colliderA = res.colliderA
        let colliderB = res.colliderB
        if (colliderA.node.name === 'player') {
            this.skill.attractDiamond(colliderA.node)
            colliderA.node.getComponent('playerScri').doHPCalculate(this.HP, true)
            this.node.removeFromParent()
        }
    },

    lateUpdate(dt) {
        if (!this.isAttract) {
            this.node.x -= (1 + config.speedLevel)
        }
    }
});
