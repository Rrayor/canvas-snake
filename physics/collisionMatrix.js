import { rectanglesOverlap } from './geometry'
import { ctx } from '../index'

const collisionColCount = 10
const collisionRowCount = 10

export let collisionMatrix = {}
export let colliderList = []

export const clearColliders = () => {
    collisionMatrix = {}
    colliderList = []
}

let colSize, rowSize

export const setupCollisionMatrix = (canvasWidth, canvasHeight) => {
    colSize = canvasWidth / collisionColCount
    rowSize = canvasHeight / collisionRowCount

    for (let y = 0; y < collisionColCount; y++) {
        collisionMatrix[y] = {}

        for (let x = 0; x < collisionRowCount; x++) {
            collisionMatrix[y][x] = {
                x: colSize * x,
                y: rowSize * y,
                colliders: []
            }
        }
    }
}

export const registerNewPosition = collider => {

    for (const cell of collider.cells) {
        collisionMatrix[cell.y][cell.x].colliders = collisionMatrix[cell.y][cell.x].colliders.filter(c => c.gameObject.name !== collider.gameObject.name)
    }

    const colliderPoints = collider.shape.getPoints()

    const minX = Math.floor(colliderPoints.minX / (640 / collisionColCount)) //TODO: magic numbers
    const minY = Math.floor(colliderPoints.minY / (480 / collisionRowCount))
    const maxX = Math.floor(colliderPoints.maxX / (640 / collisionColCount))
    const maxY = Math.floor(colliderPoints.maxY / (480 / collisionRowCount))

    const cells = [
        { x: minX, y: minY },
        { x: minX, y: maxY },
        { x: maxX, y: minY },
        { x: maxX, y: maxY }
    ]

    for (const cell of cells) {
        collisionMatrix[cell.y][cell.x].colliders = collisionMatrix[cell.y][cell.x].colliders.filter(c => c.gameObject.name !== collider.gameObject.name)
    }

    colliderList = colliderList.filter(c => c.gameObject.name !== collider.gameObject.name)

    for (const cell of cells) {
        const existsInCell = collisionMatrix[cell.y][cell.x].colliders.some(c => c.gameObject.name === collider.gameObject.name)

        if (!existsInCell)
            collisionMatrix[cell.y][cell.x].colliders.push(collider)
    }

    const existsInList = colliderList.some(c => c.gameObject.name === collider.gameObject.name)

    if (!existsInList)
        colliderList.push(collider)

    return cells
}

export const tick = () => {

    for (let y = 0; y < collisionColCount; y++) {
        for (let x = 0; x < collisionRowCount; x++) {

            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "purple";
            ctx.rect(collisionMatrix[y][x].x, collisionMatrix[y][x].y, colSize, rowSize)
            ctx.stroke();

            if (collisionMatrix[y][x].colliders.length <= 0)
                continue

            for (let i = 0; i < collisionMatrix[y][x].colliders.length; i++) {

                if (collisionMatrix[y][x].colliders.length < 2)
                    continue

                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "orange";
                ctx.rect(collisionMatrix[y][x].x, collisionMatrix[y][x].y, colSize, rowSize)
                ctx.stroke();

                let rectangle1Points = collisionMatrix[y][x].colliders[i].shape.getPoints()

                ctx.beginPath();
                ctx.lineWidth = "2";
                ctx.strokeStyle = "pink";
                ctx.rect(rectangle1Points.minX, rectangle1Points.minY, rectangle1Points.maxX - rectangle1Points.minX, rectangle1Points.maxY - rectangle1Points.minY)
                ctx.stroke();

                for (let j = collisionMatrix[y][x].colliders.length - 1; j > i; j--) {
                    let rectangle2Points = collisionMatrix[y][x].colliders[j].shape.getPoints()

                    ctx.beginPath();
                    ctx.lineWidth = "2";
                    ctx.strokeStyle = "blue";
                    ctx.rect(rectangle2Points.minX, rectangle2Points.minY, rectangle2Points.maxX - rectangle2Points.minX, rectangle2Points.maxY - rectangle2Points.minY)
                    ctx.stroke();

                    let overlapping = rectanglesOverlap(
                        rectangle1Points.minX, rectangle1Points.maxX, rectangle1Points.minY, rectangle1Points.maxY,
                        rectangle2Points.minX, rectangle2Points.maxX, rectangle2Points.minY, rectangle2Points.maxY
                    )

                    if (overlapping) {
                        collisionMatrix[y][x].colliders[i].onCollision(collisionMatrix[y][x].colliders[j])
                        collisionMatrix[y][x].colliders[j].onCollision(collisionMatrix[y][x].colliders[i])
                    }
                }
            }
        }
    }
}