import Collider from './Collider'
import Rectangle from './Rectangle'

import { debugMode } from '../settings'
import { drawCustomRect } from '../utils/debug'

export default class BoxCollider extends Collider {

    constructor(gameObject, rectangle) {
        if (!(rectangle instanceof Rectangle))
            throw new Error('BoxCollider needs a Rectangle object as shape')

        super(gameObject, rectangle)
    }

    tick() {
        super.tick()

        if (debugMode) {
            drawCustomRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height, 1, 'red')
        }
    }
}