import Shape from './Shape'

export default class Rectangle extends Shape {

    constructor(initialX, initialY, width, height) {
        super(initialX, initialY)
        this.width = width
        this.height = height
    }

    getPoints() {
        return {
            minX: this.x,
            minY: this.y,
            maxX: this.x + this.width,
            maxY: this.y + this.height
        }
    }
}