import Estatus from "../Estatus";

/**
 * ���ƽڵ�ֻ��һ���ӽڵ�
 *  1.��������ӽڵ��ִ�д���
 * */
export default class limitNode{

    curr_re = 0 // ��ǰ�ظ�ִ�еĴ���
    limit = 0 // ����ִ�еĴ���
    allow_re_init = false //�Ƿ��������³�ʼ��

    constructor(limit, allow_re_init) {
        this.limit = limit
        this.allow_re_init = allow_re_init
        this.children = []
    }

    addChild(node) { // ����ӽڵ�
        if (this.children.length === 0) {
            this.children.push(node)
        } else {
            console.log('only one child')
        }
        return this
    }

    execute(node) {
        if (this.curr_re === limit) { // ִ�д����ﵽ���ƴ���
            return Estatus.FAILURE
        }
        if (children.length === 0) { //���û������ӽڵ㣬ֱ�����
            this.curr_re++;
            return Estatus.SUCCESS
        }
        const status = this.children[0].execute(node)
        if (status === Estatus.SUCCESS || status === Estatus.FAILURE) {
            this.curr_re++;
            this.initChildren(node)
        }
        return status
    }

    init(node) {
        if (this.allow_re_init) {
            this.curr_re = 0
        }
        this.initChildren(node)
    }

    initChildren(node) {
        if (this.children.length === 1) {
            this.children[0].init(node)
        }
    }
}