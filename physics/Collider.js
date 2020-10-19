import { registerNewPosition } from './collisionMatrix'

export default class Collider {

    constructor(gameObject, shape) {
        this.gameObject = gameObject
        this.shape = shape
        this.cells = [{ x: 0, y: 0 }]
        this.cells = registerNewPosition(this)
    }

    onCollision(other) {
        if (typeof (this.gameObject.onCollision) === 'function')
            this.gameObject.onCollision(other)
    }

    tick() {
        this.shape.x = this.gameObject.x
        this.shape.y = this.gameObject.y
        this.cells = registerNewPosition(this)
    }
}