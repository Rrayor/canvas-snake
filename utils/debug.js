import { ctx } from '../index'

export const drawCustomRect = (x, y, width, height, strength, color) => {
    ctx.beginPath();
    ctx.lineWidth = strength || 1;
    ctx.strokeStyle = color || red;
    ctx.rect(x, y, width, height)
    ctx.stroke();
}