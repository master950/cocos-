import Effect from './common/effect'
import CustomEvent from './common/event'
import request from './common/request'
const conf = require('./common/protobuf/utils/conf')

cc.Class({
    extends: cc.Component,

    properties: {
        startMenu: cc.Node, // 开始菜单
        playComp: cc.Node, // page容器
        logo: cc.Node, //logo
        playBtn: cc.Button, // 开始按钮
        settingDialog: cc.Node,
        settingBtn: cc.Button,
        dialog: cc.Node // 对话框

    },

    // use this for initialization
    onLoad: function () {
        this.effect = new Effect()
        this.customEvent = new CustomEvent()
    },

    // 准备工作
    start() {
        this.registerPageBtn()
        cc.director.preloadScene("mainScene", function () {
            cc.log("开始预加载");
        });
       // this.setLandscape()
    },
    setLandscape() { // 设置横屏
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
            "changeOrientation", "(I)V", 0); //0横1竖
        }else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("IOSHelper", "changeOrientation:", 0);
        }else {
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        }
        let width = cc.view.getFrameSize().height < cc.view.getFrameSize().width ?
        cc.view.getFrameSize().width : cc.view.getFrameSize().height;
        let height = cc.view.getFrameSize().height > cc.view.getFrameSize().width ?
        cc.view.getFrameSize().width : cc.view.getFrameSize().height;
        cc.view.setFrameSize(width, height);
        cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.FIXED_WIDTH);
    },

    registerPageBtn: function () {
        let clicks = new Map()

        // setting按钮 button事件注册
        clicks.set(this.settingBtn.node, res => {
            this.effect.play('fadeIn', this.dialog, this.settingDialog)
        })
        let node = this.settingDialog.getChildByName('closeBtn')
        clicks.set(node, res => {
            this.effect.play('fadeOut')
        })

        // play按钮 点击事件注册
        clicks.set(this.playBtn.node, this.startGame)
        this.customEvent.rigisterAllBtn(clicks)
    },
    // 开始游戏
    startGame() {
        const player = {
            name: '张三',
            score: 0,
            position: cc.v2(0, 0),
            hp: 100,
            isJump: false,
            isDead: false,
            jumpLevel: 0,
            isBigger: false,
            isAttract: false
        }
        const Player = conf.get('player')
        const baseData = new Player(player)
        const buf = Player.encode(baseData).finish();
        const dbuf = Player.decode(buf)
        console.log('base', baseData)
        console.log('buf', buf)
        console.log('dbuf', dbuf)
       // request.sendData(buf)
        cc.director.loadScene('mainScene')
    },

    startMenuAnim: function () { // 开始菜单的动画
        
    },

    // called every frame
    update: function (dt) {

    },
});
