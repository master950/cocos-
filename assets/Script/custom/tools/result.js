import config from "../../common/config";

cc.Class({
    extends: cc.Component,

    properties: {
      score: 0
    },

    start() {
        this.doLabelChange(0)
    },

    doLabelChange(num) {
        const label = this.node.getComponent(cc.Label)
        label.string = `score : ${this.score + num}`
        this.score += num
    }
})
