export default class Effect {

    animManager = new Map() // 动画管理
    viewMap = new Map() // 界面图层队列
    defaultAnimSpeed = 0.2 // 默认动画速度

    constructor() {
        this.init()
    }

    init() { // 初始化动画
        this.animManager.set('fadeIn', this.startFadeIn)
        this.animManager.set('fadeOut', this.startFadeOut)
        this.animManager.set('ejectIn', this.startEjectIn)
        this.animManager.set('ejectOut', this.startEjectOut)
        this.animManager.set('pressUp', this.pressBtnUp)
        this.animManager.set('pressDown', this.pressBtnDown)
    }

    /**
     * 对话框弹进动画
     * @param {any} pageNode
     * @param {any} nodeContainer
     */
    startFadeIn(pageNode, nodeContainer, speed) {
        pageNode.active = true
        let animSpeed = speed ? speed : this.defaultAnimSpeed
        const callback = cc.callFunc(this.onFadeInFinish, this)
        const actionFadeIn = cc.sequence([cc.spawn(cc.fadeTo(animSpeed, 255), cc.scaleTo(animSpeed, 1.1)), cc.scaleTo(animSpeed, 1.0)], callback)
        cc.eventManager.pauseTarget(nodeContainer) // 停止根节点的一切动作
        nodeContainer.position = cc.v2(0, 0) //设置根节点居中
        nodeContainer.setScale(.2) // 设置根节点的缩放比例
        nodeContainer.opacity = 0 // 设置透明度
        nodeContainer.runAction(actionFadeIn) //执行动作

        let viewObject = { 'pageNode': pageNode, 'nodeContainer': nodeContainer }
        this.viewMap.set('fadeIn',viewObject) // 添加进界面映射
    }

    /**
     * 对话框弹进动画回调
     * */
    onFadeInFinish() {
        let viewObject = this.viewMap.get('fadeIn') // 根节点
        cc.eventManager.resumeTarget(viewObject.nodeContainer) // 恢复根节点动作
    }

    /**
     * 对话框弹出动画
     * */
    startFadeOut(speed) {
        let animSpeed = speed ? speed : this.defaultAnimSpeed
        const callback = cc.callFunc(this.onFadeOutFinish, this)
        const actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(animSpeed, 0), cc.scaleTo(animSpeed, .3)), callback)
        let viewObject = this.viewMap.get('fadeIn') //获取根节点
        cc.eventManager.pauseTarget(viewObject.nodeContainer)// 暂停
        viewObject.nodeContainer.runAction(actionFadeOut)// 执行动作
    }

    /**
     * 对话框弹出动画回调
     * */
    onFadeOutFinish() {
        this.viewMap.get('fadeIn').pageNode.active = false //关闭页面根节点
    }

    /**
     * 弹进动画
     * @param {any} pageNode
     * @param {any} nodeContainer
     * @param {any} isRight
     * @param {any} speed
     */
    startEjectIn(pageNode, nodeContainer, params) {
        let animSpeed = params.speed ? params.speed : this.defaultAnimSpeed
        let actionArray = cc.moveTo(animSpeed, params.pos)
        if (params.elasticity) actionArray = [cc.moveTo(animSpeed, params.elasticity),cc.moveTo(animSpeed, params.pos)]
        const callback = cc.callFunc(this.onEjectFinish, this)
        const actionEjectIn = cc.sequence(actionArray, callback)
        cc.eventManager.pauseTarget(nodeContainer) // 停止根节点的一切动作
        nodeContainer.position = params.initPos //设置根节点位置
        nodeContainer.runAction(actionEjectIn) //执行动作

        let viewObject = { 'pageNode': pageNode, 'nodeContainer': nodeContainer, 'params': params }
        this.viewMap.set('ejectIn', viewObject) // 添加进界面映射
    }

    /**
     * 弹进动画回调
     * */
    onEjectInFinish() {
        let viewObject = this.viewMap.get('ejectIn') // 根节点
        cc.eventManager.resumeTarget(viewObject.nodeContainer) // 恢复根节点动作
    }

    /**
     * 弹出动画
     * */
    startEjectOut() {
        let viewObject = this.viewMap.get('ejectIn')
        let params = viewObject.params
        let animSpeed = params.speed ? params.speed : this.defaultAnimSpeed
        const callback = cc.callFunc(this.onEjectOutFinish, this)
        const actionEjectOut = cc.sequence(cc.moveTo(animSpeed, params.initPos), callback)
        cc.eventManager.pauseTarget(viewObject.nodeContainer)// 暂停
        viewObject.nodeContainer.runAction(actionEjectOut)// 执行动作
    }

    // 弹出回调
    onEjectOutFinish() {
        this.viewMap.get('ejectIn').pageNode.active = false //关闭页面根节点
    }

    // 按下
    pressBtnUp(targetNode,speed) {
        let animSpeed = speed ? speed : this.defaultAnimSpeed
        const callback = cc.callFunc(this.onPreeBtnUpFnish, this)
        const actionPress = cc.sequence(cc.scaleTo(animSpeed, 0.7, 0.7), callback)
        targetNode.runAction(actionPress)

        this.viewMap.set('pressBtn', { tar: targetNode, speed: animSpeed })
    }

    // 按下回调
    onPreeBtnUpFnish() {}

    // 松开
    pressBtnDown(callb) {
        let tarNode = this.viewMap.get('pressBtn').tar
        const callback = cc.callFunc(callb, this)
        const actionPress = cc.sequence(cc.scaleTo(tarNode.speed, 1, 1), callback)
        tarNode.runAction(actionPress)
    }

    play(name, ...params) {
        let func = this.animManager.get(name)
        func.call(this, ...params)
    }
}