import { restart } from './game'
import { canvas, ctx } from './index'
import GameObject from './GameObject'
import BoxCollider from './physics/BoxCollider'
import Rectangle from './physics/Rectangle'
import TailBlock from './TailBlock'

export default class Snake extends GameObject {

    constructor() {
        super('snakeHead', 120, 120) //TODO: magic numbers
        this.width = 15
        this.height = 15
        this.collider = new BoxCollider(this, new Rectangle(this.x, this.y, this.width, this.height))
        this.color = '#00FF00'
        this.direction = 'right'
        this.speed = 5
        this.tailLength = 0
        this.tailBlocks = []
        this.tailPositions = []
    }

    start() {
        document.addEventListener('keydown', e => {
            e.preventDefault()
            e.stopPropagation()

            switch (e.key) {
                case 'ArrowUp':
                    if (this.direction !== 'down')
                        this.direction = 'up'
                    break
                case 'ArrowDown':
                    if (this.direction !== 'up')
                        this.direction = 'down'
                    break
                case 'ArrowLeft':
                    if (this.direction !== 'right')
                        this.direction = 'left'
                    break
                case 'ArrowRight':
                    if (this.direction !== 'left')
                        this.direction = 'right'
                    break
                default:
                    break
            }
        })

        this.tailPositions = [{ x: this.x, y: this.y }]
    }


    tick() {
        this.move()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

        this.tailPositions.unshift({ x: this.x, y: this.y })

        if (this.tailBlocks.length <= 0)
            return

        for (let i = 0; i < this.tailBlocks.length; i++) {
            this.tailBlocks[i].setPosition(this.tailPositions[i + 1])
        }

    }

    move() {
        switch (this.direction) {
            case 'up':
                this.y -= this.speed + this.height
                break
            case 'down':
                this.y += this.speed + this.height
                break
            case 'left':
                this.x -= this.speed + this.width
                break
            case 'right':
            default:
                this.x += this.speed + this.width
                break
        }

        if (this.x >= canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height - this.height
        if (this.x < 0) this.x = canvas.width - this.width
        if (this.y >= canvas.height) this.y = 0
    }

    onCollision(other) {
        if (other.gameObject.name === 'fruit')
            this.pickup()

        if (other.gameObject.name.startsWith('tail_'))
            restart()
    }

    pickup() {
        const tailBlock = new TailBlock(this.tailBlocks.length, this.tailPositions[1].x, this.tailPositions[1].y)

        this.tailBlocks.push(tailBlock)
    }
}