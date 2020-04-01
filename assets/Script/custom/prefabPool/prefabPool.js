import config from "../../common/config";

export default class PrefabPool {

    constructor() {
        this.prefabMap = new Map()
    }

    save(prefab) {
        const prefabPool = this.prefabMap.get(prefab.name)
        if (prefabPool) {
            if (prefabPool.size() === config.maxNumPrefab) {
                console.log("Can't put it anymore")
            } else {
                prefabPool.put(prefab)
                this.prefabMap.set(prefab.name, prefabPool)
            }
        } else {
            const tarPool = new cc.NodePool()
            tarPool.put(prefab)
            this.prefabMap.set(prefab.name, tarPool)
        }
    }

    get(name) {
        const prefabPool = this.prefabMap.get(name)
        if (prefabPool) {
            if (prefabPool.size() > 0) {
                return prefabPool.get()
            }
        }
        return null
    }

}