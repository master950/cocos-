import NormalAttack from "../actions/nornalAttack";
import RunAttack from '../actions/runAttack'
import SequenceNode from '../../behaviorTree/internalNode/sequenceNode'
import RepeatNode from '../../behaviorTree/internalNode/repeatNode'
import FollowPlayer from "../actions/followPlayer";
import LaserAttack from "../actions/laserAttack";

cc.Class({
    extends: cc.Component,

    properties: {
        hp: 100,
        bullet: cc.Prefab,
        laser: cc.Prefab
    },

    start() {
        this.attack()
        setTimeout(() => {
            this.schedule(this.attack, 10)
        }, 10000)
    },

    attack() {
        let sequence = new SequenceNode()
        sequence.addChild(new RunAttack(this))
            .addChild(new LaserAttack(this))
            .addChild(new FollowPlayer(this, 50, 2))
            .addChild(new FollowPlayer(this, 250, 2, true))
            .addChild(new FollowPlayer(this, 50))
            .addChild(new NormalAttack(this))
            .addChild(new NormalAttack(this))
            .addChild(new NormalAttack(this))
            .addChild(new FollowPlayer(this, 150))
            .addChild(new NormalAttack(this))
            .addChild(new NormalAttack(this))
            .addChild(new NormalAttack(this))
            .addChild(new FollowPlayer(this, 250))
            .addChild(new NormalAttack(this))
            .addChild(new NormalAttack(this))
            .addChild(new NormalAttack(this))
        sequence.execute()
    },

    update(dt) {
        
    }
});
