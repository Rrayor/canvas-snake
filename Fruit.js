import GameObject from './GameObject'
import { canvas, ctx } from './index'
import BoxCollider from './physics/BoxCollider'
import Rectangle from './physics/Rectangle'

export default class Fruit extends GameObject {

    constructor() {
        super('fruit', 0, 0)
        this.width = 30
        this.height = 30
        this.collider = new BoxCollider(this, new Rectangle(this.x, this.y, this.width, this.height))
        this.color = '#00FF00'
    }

    start() {
        this.spawn()
    }

    tick() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    spawn() {
        this.x = Math.floor(Math.random() * canvas.width - this.width)
        this.y = Math.floor(Math.random() * canvas.height - this.height)

        this.x = Math.abs(this.x)
        this.y = Math.abs(this.y)
    }

    onCollision(other) {
        if (other.gameObject.name === 'snakeHead')
            this.spawn()
    }
}