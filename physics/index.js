import { colliderList, setupCollisionMatrix } from './collisionMatrix'

const start = (canvasWidth, canvasHeight) => {
    setupCollisionMatrix(canvasWidth, canvasHeight)
}

export const tick = () => {
    colliderList.map(collider => collider.tick())
}

export default {
    start
}