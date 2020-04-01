import checkColider from './common/check'
import config from './common/config'
import request from './common/request';

cc.Class({
    extends: cc.Component,

    properties: {
        gravityNum: -10,
        player: cc.Node,
        road1: cc.Prefab,
        road2: cc.Prefab,
        needCreate: false,
        posH: 0,
        score: cc.Node,
        isGameOver: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.check = new checkColider()
        this.allBoard = []
        this.check.openPhysicManager(this.gravityNum)
        this.openDeviceMotion()
    },

    start() {
        this.initBoard()
    },

    openDeviceMotion() {
        cc.systemEvent.setAccelerometerEnabled = true
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.DeviceMotion, this)
    },

    closeDeviceMotion() {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.DeviceMotion, this)
    },

    DeviceMotion(res) {
        console.log('����', res)
    },

    initBoard() {
        let nums = this.randomInterval()
        for (let i = 0; i < nums.length; i++) {
            let temp = cc.instantiate(this.road1)
            temp.position = nums[i].pos
            this.node.addChild(temp)
            this.allBoard.push(temp)
        }
    },

    randomInterval() {
        const nums = []
        let cWidth = config.width
        for (let i = 0; i < 5; i++) {
            let data = {}
            data.pos = cc.v2(-640 + i * config.roadWidth, this.posH)
            nums.push(data)
        }
        return nums
    },

    randomType() {
        if (Math.random() * 10 > 5) {
            return this.road1
        } else {
            return this.road2
        }
       
    },

    createBoard() {
        let type = this.randomType()
        let t = cc.instantiate(type)
        let height = type === this.road2 ? this.posH + 25 : this.posH
        t.position = cc.v2(config.width / 2 + config.roadWidth, height)
        this.node.addChild(t)
        this.allBoard.push(t)
        this.needCreate = false
    },

    sendRoleData() {
        const player = {
            name: '����',
            score: 0,
            position: cc.v2(0, 0),
            hp: 100,
            isJump: false,
            isDead: false,
            jumpLevel: 0,
            isBigger: false,
            isAttract: false
        }
        request.sendData(JSON.stringify(player))
    },

    // ��ȡ��ɫ��Ϣ
    getRoleInfo() {
        if (roleData.length > 0) {
            const data = roleData.pop()
            console.log('roleData: ', data)
        }
    },

    update(dt) {
        if (!this.isGameOver) {
          //  this.sendRoleData()
           // this.getRoleInfo()
            if (this.needCreate) {
                if (this.allBoard.length < 6) {
                    this.createBoard()
                }
            }
        }
    }
});
