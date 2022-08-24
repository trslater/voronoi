import { GUI } from "dat.gui"

const pixelSize = 10

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

const setPixel = ([x, y], [r, g, b, a]) => {
    colorValues[y*width*4 + x*4 + 0] = r
    colorValues[y*width*4 + x*4 + 1] = g
    colorValues[y*width*4 + x*4 + 2] = b
    colorValues[y*width*4 + x*4 + 3] = a
}

const numSeeds = 5
const seedOrigins = []
const seedColors = []

for (let k = 0; k < numSeeds; ++k) {
    seedOrigins[k] = [
        Math.floor(Math.random()*width),
        Math.floor(Math.random()*height)
    ]
    seedColors[k] = [
        Math.floor(Math.random()*255),
        Math.floor(Math.random()*255),
        Math.floor(Math.random()*255),
        255
    ]

    setPixel(seedOrigins[k], seedColors[k])
}

context.putImageData(imageData, 0, 0)
