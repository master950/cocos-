import Road from '../common/road'
import config from '../../common/config';

cc.Class({
    extends: cc.Component,

    properties: {
        score: cc.Prefab,
        frog: cc.Prefab,
        star: cc.Prefab,
        cherry: cc.Prefab,
        childPos: []
    },

    start() {
        this.road = new Road(this.node)
        this.road.initData(false)
        this.scorePool = new cc.NodePool()
        if (Math.random() * 10 < 3) {
            this.initMonster()
        } else {
            this.initTools()
        }
    },

    getRandomType() {
        let index = Math.round(Math.random() * 1)
        let type = [this.star, this.cherry]
        return type[index]
    },

    initTools() {
        for (let i = 0; i < 3; i++) {
            let temp = null
            if (this.scorePool.length < 10) {
                if (this.scorePool.size() === 0) {
                    temp = cc.instantiate(this.score)
                    this.scorePool.put(temp)
                }
                if (!temp) temp = this.scorePool.get()
            } else {
                temp = cc.instantiate(this.score)
            }
            let pos = cc.v2(-this.node.width / 2 + (i + 1) * temp.width, this.node.height / 2 + temp.height)
            temp.position = pos
            temp.parent = this.node

        }
        if (Math.random() * 10 > 7) {
            const prefab = this.getRandomType()
            const t = cc.instantiate(prefab)
            let pos = cc.v2(-this.node.width / 2 + (3) * t.width, this.node.height / 2 + t.height)
            t.position = pos
            t.parent = this.node
        }
    },

    initMonster() {
        const t = cc.instantiate(this.frog)
        let pos = cc.v2(-this.node.width / 2 + (3) * t.width, this.node.height / 2 + t.height)
        t.position = pos
        t.parent = this.node
    },

    unuse: function () { // 回收
       
    },

    reuse: function () { // 重新使用
        
    },

    update(dt) {
        this.road.testOverflow()
    }
});
