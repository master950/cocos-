export default class AnimationManager {

    constructor(user, callFunc) {
        this.user = user
        this.userAnimate = user.getComponent(cc.Animation)
        this.userAnimate.on('finished', callFunc,this)
    }

    playAnimation(name, time) {
        if (time) this.userAnimate.setCurrentTime(time,name)
        let currName = this.userAnimate.currentClip ? this.userAnimate.currentClip.name : ''
        let state = this.userAnimate.getAnimationState(currName)
        let isPlay = state? state.isPlaying : false
        if (currName) {
            if (currName !== name) {
                this.userAnimate.play(name)
            } else {
                if (!isPlay) this.userAnimate.play(name)
            }
        } else {
            this.userAnimate.play(name)
        }
    }

    getAnimateStatus() {
        let currName = this.userAnimate.currentClip ? this.userAnimate.currentClip.name : ''
        let state = this.userAnimate.getAnimationState(currName)
        return {
            name: currName,
            state: state
        }
    }
}