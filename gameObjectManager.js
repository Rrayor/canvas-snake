let gameObjects = {}

export const registerGameObject = gameObject => {
    if (gameObjects[gameObject.name])
        throw new Error('Name of game object must be unique')

    gameObjects[gameObject.name] = gameObject
}

export const destroyGameObject = gameObject => {
    gameObjects[gameObject.name] = undefined
}

export const clearGameObjects = () => gameObjects = {}

export const getGameObjectByName = name => gameObjects[name]

export const getGameObjects = () => gameObjects