import physics from './physics/index'
import { canvas, ctx } from './index'
import { clearColliders, tick as collisionMatrixTick } from './physics/collisionMatrix'
import { tick as colliderListTick } from './physics/index'
import { clearGameObjects, getGameObjects } from './gameObjectManager'

import Fruit from './Fruit'
import Snake from './Snake'

const tick = new Event('tick')

const fps = 5

let run = true

let running = null

const startGame = () => {
    physics.start(canvas.clientWidth, canvas.clientHeight)

    const fruit = new Fruit()
    const snakeHead = new Snake()
    Object.values(getGameObjects()).map(o => o.start())
}

const gameLoop = () => {
    startGame()
    const interval = 1000 / fps

    running = setInterval(() => document.dispatchEvent(tick), interval)
}


document.addEventListener('tick', e => {
    if (run) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        Object.values(getGameObjects()).map(o => { if (typeof (o.tick) === 'function') o.tick() })
        colliderListTick()
        collisionMatrixTick()
    }
})

document.addEventListener('keyup', e => e.key == 'Escape' && (run = !run))


export const restart = () => {
    clearColliders()
    clearGameObjects()
    clearInterval(running)
    gameLoop()
}

gameLoop()