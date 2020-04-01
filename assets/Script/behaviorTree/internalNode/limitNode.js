import Estatus from "../Estatus";

/**
 * 限制节点只有一个子节点
 *  1.限制这个子节点的执行次数
 * */
export default class limitNode{

    curr_re = 0 // 当前重复执行的次数
    limit = 0 // 限制执行的次数
    allow_re_init = false //是否允许重新初始化

    constructor(limit, allow_re_init) {
        this.limit = limit
        this.allow_re_init = allow_re_init
        this.children = []
    }

    addChild(node) { // 添加子节点
        if (this.children.length === 0) {
            this.children.push(node)
        } else {
            console.log('only one child')
        }
        return this
    }

    execute(node) {
        if (this.curr_re === limit) { // 执行次数达到限制次数
            return Estatus.FAILURE
        }
        if (children.length === 0) { //如果没有添加子节点，直接完成
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