cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.rigid = this.node.getComponent(cc.RigidBody)
    },
    onBeginContact(res) { // Åö×²¿ªÊ¼
        let other = null
        if (res.colliderA.name === 'frog') {
            other = res.colliderA
        }
        if (res.colliderB.name === 'frog') {
            other = res.colliderB
        }
        if (other) {
            const frog = other.node.getComponent(other.node.name)
            let posO = other.node.convertToWorldSpaceAR(other.node.position)
            let posS = this.node.convertToWorldSpaceAR(this.node.position)
            console.log(posO)
            console.log(posS)
            let temp
            if (posO.x < posS.x) {
                console.log('bbbb')
                temp = cc.v2(300, 280)
            } else {
                console.log('ssss')
                temp = cc.v2(-300, 280)
            }
            frog.rigid.applyLinearImpulse(temp, other.node.position)
        }
    },
    // update (dt) {},
});
