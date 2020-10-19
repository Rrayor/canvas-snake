export const rectanglesOverlap = (r1MinX, r1MaxX, r1MinY, r1MaxY, r2MinX, r2MaxX, r2MinY, r2MaxY) => {
    const collideWithFruitHorizontal = r1MinX >= r2MinX && r1MinX <= r2MaxX
    const collideWithFruitVertical = r1MinY >= r2MinY && r1MinY <= r2MaxY

    const collideWithFruitHorizontal2 = r1MaxX >= r2MinX && r1MaxX <= r2MaxX
    const collideWithFruitVertical2 = r1MaxY >= r2MinY && r1MaxY <= r2MaxY

    const result = (collideWithFruitHorizontal && collideWithFruitVertical) ||
        (collideWithFruitHorizontal2 && collideWithFruitVertical2)

    return result
}