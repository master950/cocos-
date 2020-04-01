cc.Class({
    extends: cc.Component,

    properties: {
        status: true,
        type: ''
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.registerBtn()
    },

    registerBtn() {
        let button = this.node.getComponent(cc.Button)
        this.node.on('click', res => {
            if (this.status) {
                let sprite = button.normalSprite
                button.normalSprite = button.pressedSprite
                button.pressedSprite = sprite
            } else {
                let sprite = button.normalSprite
                button.normalSprite = button.pressedSprite
                button.pressedSprite = sprite
            }
            this.status = !this.status
        })
    }

    // update (dt) {},
});
