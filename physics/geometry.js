const checkForCollison = (minX1, minX2, maxX2, minY1, minY2, maxY2) => {

    //FIXME: Naming is terrible

    const collideHorizontal = minX1 >= minX2 && minX1 <= maxX2
    const collideVertical = minY1 >= minY2 && minY1 <= maxY2

    return collideHorizontal && collideVertical
}

export const rectanglesOverlap = (r1MinX, r1MaxX, r1MinY, r1MaxY, r2MinX, r2MaxX, r2MinY, r2MaxY) => {
    const collision1 = checkForCollison(r1MinX, r2MinX, r2MaxX, r1MinY, r2MinY, r2MaxY)
    const collision2 = checkForCollison(r1MaxX, r2MinX, r2MaxX, r1MaxY, r2MinY, r2MaxY)

    const result = collision1 || collision2


    return result
}