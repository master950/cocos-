import FailurePolicy from "../FailurePolicy";
import SuccessPolicy from "../SuccessPolicy";
import Estatus from "../Estatus";

export default class ParallNode{

    childrenStatus = null
    failPolicy = null
    successPolicy = null

    constructor(fail, success) {
        if (fail && success) {
            this.failPolicy = fail
            this.successPolicy = success
        } else {
            this.failPolicy = FailurePolicy.FAIL_ON_ALL
            this.successPolicy = SuccessPolicy.SUCCESS_ON_ALL
        }
        this.childrenStatus = new Map()
        this.children = []
    }

    init(node) { // ³õÊ¼»¯
        if (this.childrenStatus != null) {
            this.childrenStatus = null
        }
        this.childrenStatus = new Map()
        for (let child of this.children) {
            this.childrenStatus.set(child, Estatus.RUNNING)
        }
    }

    addChild(node) {
        this.children.push(node)
        return this
    }

    doRunning(node) {
        const promise = new Promise((resolve, reject)=> {
            for (let child of this.children) {
                const state = this.childrenStatus.get(child)
                if (state === Estatus.RUNNING) {
                    child.execute(node).then(status => {
                        if (status === Estatus.FAILURE) {
                            if (this.failPolicy === FailurePolicy.FAIL_ON_ONE) {
                                this.init(node)
                                resolve(Estatus.FAILURE)
                            } else {
                                this.childrenStatus.set(child, Estatus.FAILURE)
                            }
                        }
                        if (status === Estatus.SUCCESS) {
                            this.childrenStatus.set(child, Estatus.SUCCESS)
                        }
                    })
                }
                if (state === Estatus.FAILURE && this.failPolicy === FailurePolicy.FAIL_ON_ALL) {
                    this.childrenStatus.set(child, Estatus.FAILURE)
                }
                resolve(null)
            }
        })
        return promise
    }

    execute(node) {
        const promise = new Promise((resolve, reject)=> {
            sawSuccess = false
            sawAllSuccess = false
            sawAllFailure = true

            if (this.childrenStatus === null) {
                this.init(node)
                resolve(Estatus.SUCCESS)
            }

            this.doRunning(node).then(res => {
                if (res) {
                    resolve(res)
                } else {
                    this.childrenStatus.forEach((val, key) => {
                        switch (val) {
                            case Estatus.SUCCESS:
                                if (this.successPolicy === SuccessPolicy.SUCCESS_ON_ONE && this.failPolicy === FailurePolicy.FAIL_ON_ALL) {
                                    this.init(node)
                                    resolve(Estatus.SUCCESS)
                                }
                                this.sawSuccess = true
                                this.sawAllFailure = false
                                break
                            case Estatus.FAILURE:
                                if (this.failPolicy === FailurePolicy.FAIL_ON_ONE) {
                                    this.init(node)
                                    resolve(Estatus.FAILURE)
                                }
                                this.sawAllSuccess = false
                                break
                            case Estatus.RUNNING:
                                if (this.failPolicy === FailurePolicy.FAIL_ON_ALL && this.successPolicy === SuccessPolicy.SUCCESS_ON_ALL) {
                                    resolve(Estatus.RUNNING)
                                }
                                this.sawAllSuccess = false
                                this.sawAllFailure = false
                                break
                        }
                    })
                    if (this.sawSuccess && this.successPolicy === SuccessPolicy.SUCCESS_ON_ONE || this.sawAllSuccess && this.successPolicy === SuccessPolicy.SUCCESS_ON_ALL) {
                        this.init(node)
                        resolve(Estatus.SUCCESS)
                    } else if (this.sawAllFailure && this.failPolicy === FailurePolicy.FAIL_ON_ALL) {
                        this.init(node)
                        resolve(Estatus.FAILURE)
                    } else {
                        resolve(Estatus.RUNNING)
                    }
                }
            })
        })
        return promise
    }

}