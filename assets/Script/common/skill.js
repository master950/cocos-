// ����Ч��
export default class Skill {

    constructor() { 
        this.time = 10
    }

    getBigger(tarNode) { // ����޵�
        const player = tarNode.getComponent('playerScri')
        tarNode.scale = 2
        player.isBigger = true
        player.scheduleOnce(() => {
            tarNode.scale = 1
            player.isBigger = false
        }, this.time)
    }

    attractDiamond(tarNode) { // ����
        const player = tarNode.getComponent('playerScri')
        player.isAttract = true
        player.scheduleOnce(() => {
            tarNode.scale = 1
            player.isAttract = false
        }, this.time)
    }

}