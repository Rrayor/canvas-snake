import { rectanglesOverlap } from './geometry'
import { canvasSize, debugMode } from '../settings'
import { drawCustomRect } from '../utils/debug'

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

const removeColliderFromOldCells = collider => {
    for (const cell of collider.cells) {
        collisionMatrix[cell.y][cell.x].colliders = collisionMatrix[cell.y][cell.x].colliders.filter(c => c.gameObject.name !== collider.gameObject.name)
    }
}

const calculateCells = collider => {
    const colliderPoints = collider.shape.getPoints()

    const minX = Math.floor(colliderPoints.minX / (canvasSize.width / collisionColCount))
    const minY = Math.floor(colliderPoints.minY / (canvasSize.height / collisionRowCount))
    const maxX = Math.floor(colliderPoints.maxX / (canvasSize.width / collisionColCount))
    const maxY = Math.floor(colliderPoints.maxY / (canvasSize.height / collisionRowCount))

    const cells = [
        { x: minX, y: minY },
        { x: minX, y: maxY },
        { x: maxX, y: minY },
        { x: maxX, y: maxY }
    ]

    return cells
}

const addColliderToCells = (collider, cells) => {
    for (const cell of cells) {
        const existsInCell = collisionMatrix[cell.y][cell.x].colliders.some(c => c.gameObject.name === collider.gameObject.name)

        if (!existsInCell)
            collisionMatrix[cell.y][cell.x].colliders.push(collider)
    }
}

const addColliderToList = collider => {
    const existsInList = colliderList.some(c => c.gameObject.name === collider.gameObject.name)

    if (!existsInList)
        colliderList.push(collider)
}

export const registerNewPosition = collider => {
    removeColliderFromOldCells(collider)

    //Calculate cells, the collider is currently in
    const cells = calculateCells(collider)

    addColliderToCells(collider, cells)
    addColliderToList(collider)

    return cells
}

const backwardCellLoop = (y, x, collider1Idx, collider2Idx, rectangle1Points) => {
    const rectangle2Points = collisionMatrix[y][x].colliders[collider2Idx].shape.getPoints()

    // In debug mode make second currently checked collider blue
    if (debugMode) {
        drawCustomRect(rectangle2Points.minX, rectangle2Points.minY, rectangle2Points.maxX - rectangle2Points.minX, rectangle2Points.maxY - rectangle2Points.minY, 2, 'blue')
    }

    const overlapping = rectanglesOverlap(
        rectangle1Points.minX, rectangle1Points.maxX, rectangle1Points.minY, rectangle1Points.maxY,
        rectangle2Points.minX, rectangle2Points.maxX, rectangle2Points.minY, rectangle2Points.maxY
    )

    if (overlapping) {
        collisionMatrix[y][x].colliders[collider1Idx].onCollision(collisionMatrix[y][x].colliders[collider2Idx])
        collisionMatrix[y][x].colliders[collider2Idx].onCollision(collisionMatrix[y][x].colliders[collider1Idx])
    }
}

const forwardCellLoop = (y, x, collider1Idx) => {
    // Make grid cell orange where collision can happen if in debug mode
    if (debugMode) {
        drawCustomRect(collisionMatrix[y][x].x, collisionMatrix[y][x].y, colSize, rowSize, 1, 'orange')
    }

    const rectangle1Points = collisionMatrix[y][x].colliders[collider1Idx].shape.getPoints()

    // In debug mode make first currently checked collider pink
    if (debugMode) {
        drawCustomRect(rectangle1Points.minX, rectangle1Points.minY, rectangle1Points.maxX - rectangle1Points.minX, rectangle1Points.maxY - rectangle1Points.minY, 2, 'pink')
    }

    // Start a backward loop to check every collider in cell against current collider
    for (let collider2Idx = collisionMatrix[y][x].colliders.length - 1; collider2Idx > collider1Idx; collider2Idx--) {
        backwardCellLoop(y, x, collider1Idx, collider2Idx, rectangle1Points)
    }
}

const cellTick = (y, x) => {
    for (let collider1Idx = 0; collider1Idx < collisionMatrix[y][x].colliders.length; collider1Idx++) {
        // No collision can happen with less than 2 colliders
        if (collisionMatrix[y][x].colliders.length < 2)
            continue

        forwardCellLoop(y, x, collider1Idx)
    }
}

export const tick = () => {

    for (let y = 0; y < collisionColCount; y++) {
        for (let x = 0; x < collisionRowCount; x++) {
            // Render grid of cells in debug mode
            if (debugMode) {
                drawCustomRect(collisionMatrix[y][x].x, collisionMatrix[y][x].y, colSize, rowSize, 1, 'purple')
            }

            // No further work required this iteration because no colliders are present in this cell
            if (collisionMatrix[y][x].colliders.length <= 0)
                continue

            cellTick(y, x)
        }
    }
}