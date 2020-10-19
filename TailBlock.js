import { ctx } from '.';
import { restart } from './game';
import GameObject from './GameObject';
import BoxCollider from './physics/BoxCollider';
import Rectangle from './physics/Rectangle';

export default class TailBlock extends GameObject {

    constructor(index, initialX, initialY) {
        super('tail_' + index, initialX, initialY)

        this.width = 15
        this.height = 15

        this.color = '#00FF00'
        this.collider = new BoxCollider(this, new Rectangle(this.x, this.y, this.width, this.height))
    }

    setPosition(pos) {
        this.x = pos.x || this.x
        this.y = pos.y || this.y
    }

    tick() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    onCollision(other) {

    }
}