export default class Effect {

    animManager = new Map() // ��������
    viewMap = new Map() // ����ͼ�����
    defaultAnimSpeed = 0.2 // Ĭ�϶����ٶ�

    constructor() {
        this.init()
    }

    init() { // ��ʼ������
        this.animManager.set('fadeIn', this.startFadeIn)
        this.animManager.set('fadeOut', this.startFadeOut)
        this.animManager.set('ejectIn', this.startEjectIn)
        this.animManager.set('ejectOut', this.startEjectOut)
        this.animManager.set('pressUp', this.pressBtnUp)
        this.animManager.set('pressDown', this.pressBtnDown)
    }

    /**
     * �Ի��򵯽�����
     * @param {any} pageNode
     * @param {any} nodeContainer
     */
    startFadeIn(pageNode, nodeContainer, speed) {
        pageNode.active = true
        let animSpeed = speed ? speed : this.defaultAnimSpeed
        const callback = cc.callFunc(this.onFadeInFinish, this)
        const actionFadeIn = cc.sequence([cc.spawn(cc.fadeTo(animSpeed, 255), cc.scaleTo(animSpeed, 1.1)), cc.scaleTo(animSpeed, 1.0)], callback)
        cc.eventManager.pauseTarget(nodeContainer) // ֹͣ���ڵ��һ�ж���
        nodeContainer.position = cc.v2(0, 0) //���ø��ڵ����
        nodeContainer.setScale(.2) // ���ø��ڵ�����ű���
        nodeContainer.opacity = 0 // ����͸����
        nodeContainer.runAction(actionFadeIn) //ִ�ж���

        let viewObject = { 'pageNode': pageNode, 'nodeContainer': nodeContainer }
        this.viewMap.set('fadeIn',viewObject) // ��ӽ�����ӳ��
    }

    /**
     * �Ի��򵯽������ص�
     * */
    onFadeInFinish() {
        let viewObject = this.viewMap.get('fadeIn') // ���ڵ�
        cc.eventManager.resumeTarget(viewObject.nodeContainer) // �ָ����ڵ㶯��
    }

    /**
     * �Ի��򵯳�����
     * */
    startFadeOut(speed) {
        let animSpeed = speed ? speed : this.defaultAnimSpeed
        const callback = cc.callFunc(this.onFadeOutFinish, this)
        const actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(animSpeed, 0), cc.scaleTo(animSpeed, .3)), callback)
        let viewObject = this.viewMap.get('fadeIn') //��ȡ���ڵ�
        cc.eventManager.pauseTarget(viewObject.nodeContainer)// ��ͣ
        viewObject.nodeContainer.runAction(actionFadeOut)// ִ�ж���
    }

    /**
     * �Ի��򵯳������ص�
     * */
    onFadeOutFinish() {
        this.viewMap.get('fadeIn').pageNode.active = false //�ر�ҳ����ڵ�
    }

    /**
     * ��������
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
        cc.eventManager.pauseTarget(nodeContainer) // ֹͣ���ڵ��һ�ж���
        nodeContainer.position = params.initPos //���ø��ڵ�λ��
        nodeContainer.runAction(actionEjectIn) //ִ�ж���

        let viewObject = { 'pageNode': pageNode, 'nodeContainer': nodeContainer, 'params': params }
        this.viewMap.set('ejectIn', viewObject) // ��ӽ�����ӳ��
    }

    /**
     * ���������ص�
     * */
    onEjectInFinish() {
        let viewObject = this.viewMap.get('ejectIn') // ���ڵ�
        cc.eventManager.resumeTarget(viewObject.nodeContainer) // �ָ����ڵ㶯��
    }

    /**
     * ��������
     * */
    startEjectOut() {
        let viewObject = this.viewMap.get('ejectIn')
        let params = viewObject.params
        let animSpeed = params.speed ? params.speed : this.defaultAnimSpeed
        const callback = cc.callFunc(this.onEjectOutFinish, this)
        const actionEjectOut = cc.sequence(cc.moveTo(animSpeed, params.initPos), callback)
        cc.eventManager.pauseTarget(viewObject.nodeContainer)// ��ͣ
        viewObject.nodeContainer.runAction(actionEjectOut)// ִ�ж���
    }

    // �����ص�
    onEjectOutFinish() {
        this.viewMap.get('ejectIn').pageNode.active = false //�ر�ҳ����ڵ�
    }

    // ����
    pressBtnUp(targetNode,speed) {
        let animSpeed = speed ? speed : this.defaultAnimSpeed
        const callback = cc.callFunc(this.onPreeBtnUpFnish, this)
        const actionPress = cc.sequence(cc.scaleTo(animSpeed, 0.7, 0.7), callback)
        targetNode.runAction(actionPress)

        this.viewMap.set('pressBtn', { tar: targetNode, speed: animSpeed })
    }

    // ���»ص�
    onPreeBtnUpFnish() {}

    // �ɿ�
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