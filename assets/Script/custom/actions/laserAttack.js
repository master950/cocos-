import PrefabPool from "../prefabPool/prefabPool";
import Estatus from "../../behaviorTree/Estatus";
import FollowPlayer from "./followPlayer";

export default class LaserAttack {

    constructor(target,pos,time) {
        this.target = target
    }

    init() { }

    execute(node) {
        const promise = new Promise((resolve, reject) => {
            const tarNode = this.target.node
            const height = tarNode.height
            const width = tarNode.width
            const aser = cc.instantiate(this.target.laser)
            aser.position = cc.v2((-aser.height - width) / 2, -(height - 10) / 2)
            aser.setParent(this.target.node)
            resolve(Estatus.SUCCESS)
        })
        return promise
    }
}