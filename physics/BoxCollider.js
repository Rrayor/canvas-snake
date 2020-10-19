import Collider from './Collider'
import Rectangle from './Rectangle'

import { canvas, ctx } from '../index'
import { registerNewPosition } from './collisionMatrix'

export default class BoxCollider extends Collider {

    constructor(gameObject, rectangle) {
        if (!(rectangle instanceof Rectangle))
            throw new Error('BoxCollider needs a Rectangle object as shape')

        super(gameObject, rectangle)
    }

    tick() {
        this.shape.x = this.gameObject.x
        this.shape.y = this.gameObject.y
        this.cells = registerNewPosition(this)


        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(this.shape.x, this.shape.y, this.shape.width, this.shape.height)
        ctx.stroke();
    }
}