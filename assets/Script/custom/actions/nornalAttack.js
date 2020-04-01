import Estatus from "../../behaviorTree/Estatus";
import PrefabPool from "../prefabPool/prefabPool";

export default class NormalAttack{

    time = 250

    constructor(target,time) {
        this.target = target
        this.prefabPool = new PrefabPool()
        if(time) this.time = time
    }

    init() { }

    execute(node) {
        const promise = new Promise((resolve, reject) => {
            const pos = this.target.node.position
            let bullet = this.prefabPool.get('bullet')
            if (! bullet) {
                bullet = cc.instantiate(this.target.bullet)
            }
            const width = this.target.node.width
            const height = this.target.node.height
            if (pos.scaleX > 0) {
                bullet.position = cc.v2((width) / 2, -(height-10) / 2)
            } else {
                bullet.position = cc.v2(-(width) / 2, -(height - 10) / 2)
            }
            bullet.setParent(this.target.node)
            setTimeout(res => {
                resolve(Estatus.SUCCESS);
            }, this.time)
        })
        return promise
    }
}