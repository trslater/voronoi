import { GUI } from "dat.gui"

const pixelSize = 10
const numSeeds = 10

const gui = new GUI()

const viewport = document.getElementById("viewport")

const width = Math.floor(viewport.offsetWidth/pixelSize)
const height = Math.floor(viewport.offsetHeight/pixelSize)

const canvas = document.createElement("canvas")

canvas.width = width
canvas.height = height

viewport.appendChild(canvas)

const context = canvas.getContext("2d")
const imageData = context.createImageData(width, height)
const colorValues = imageData.data

const getColor = (x, y) => {
    const r = colorValues[y*width*4 + x*4 + 0]
    const g = colorValues[y*width*4 + x*4 + 1]
    const b = colorValues[y*width*4 + x*4 + 2]
    const a = colorValues[y*width*4 + x*4 + 3]

    return { r, g, b, a }
}

const setColor = (x, y, { r, g, b, a }) => {
    colorValues[y*width*4 + x*4 + 0] = r
    colorValues[y*width*4 + x*4 + 1] = g
    colorValues[y*width*4 + x*4 + 2] = b
    colorValues[y*width*4 + x*4 + 3] = a
}

const isSameColor = (color1, color2) => {
    return (
        color1.r === color2.r &&
        color1.g === color2.g &&
        color1.b === color2.b &&
        color1.a === color2.a
    )
}

const distance = (p1, p2) => {
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y

    return Math.floor(Math.sqrt(dx*dx + dy*dy))
}

const emptyColor = { r: 0, g: 0, b: 0, a: 0 }
const seeds = []
const originsByColor = {}

const getOriginByColor = ({ r, g, b, a }) => {
    return originsByColor[r][g][b]
}

for (let k = 0; k < numSeeds; ++k) {
    const x = Math.floor(Math.random()*width)
    const y = Math.floor(Math.random()*height)

    const r = Math.floor(Math.random()*255)
    const g = Math.floor(Math.random()*255)
    const b = Math.floor(Math.random()*255)

    if (!(r in originsByColor)) originsByColor[r] = {}
    if (!(g in originsByColor)) originsByColor[r][g] = {}
    if (!(b in originsByColor)) originsByColor[r][g][b] = {}
    originsByColor[r][g][b] = { x, y }

    seeds[k] = { x, y }
    
    setColor(x, y, { r, g, b, a: 255 })
}

let stepLength = 1

while (stepLength < Math.max(width, height)/2) {
    const neighbours = []

    for (const seed of seeds) {
        const seedColor = getColor(seed.x, seed.y)

        for (let i = -1; i < 2; ++i) {
            for (let j = -1; j < 2; ++j) {
                if (i === 0 && j === 0) continue
                
                const neighbour = {
                    x: seed.x + j*stepLength,
                    y: seed.y + i*stepLength
                }

                if (neighbour.x < 0 || neighbour.x >= width) continue
                if (neighbour.y < 0 || neighbour.y >= height) continue

                const neighbourColor = getColor(neighbour.x, neighbour.y)

                // Empty
                if (isSameColor(neighbourColor, emptyColor)) {
                    setColor(neighbour.x, neighbour.y, seedColor)
                }
                // Filled with something else
                else if (!isSameColor(neighbourColor, seedColor)) {
                    const neighbourOrigin = getOriginByColor(neighbourColor)
                    const seedOrigin = getOriginByColor(seedColor)

                    if (distance(neighbour, neighbourOrigin) >= distance(neighbour, seedOrigin)) {
                        setColor(neighbour.x, neighbour.y, seedColor)
                    }
                }
                
                // TODO: Try to eliminate duplicate seeds
                neighbours.push(neighbour)
            }
        }
    }

    for (const neighbour of neighbours) {
        seeds.push(neighbour)
    }

    stepLength *= 2
}

context.putImageData(imageData, 0, 0)
