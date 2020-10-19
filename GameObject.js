import { destroyGameObject, registerGameObject } from './gameObjectManager'

export default class GameObject {

    constructor(name, initialX, initialY) {
        this.name = name
        this.x = initialX
        this.y = initialY

        registerGameObject(this)
    }

    destroy() {
        destroyGameObject(this)
    }
}