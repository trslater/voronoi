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

const setPixel = (i, j, [r, g, b, a]) => {
    colorValues[i*width*4 + j*4 + 0] = r
    colorValues[i*width*4 + j*4 + 1] = g
    colorValues[i*width*4 + j*4 + 2] = b
    colorValues[i*width*4 + j*4 + 3] = a
}

const numSeeds = 5

for (let k = 0; k < numSeeds; ++k) {
    const i = Math.floor(Math.random()*width)
    const j = Math.floor(Math.random()*width)

    setPixel(i, j, [0, 0, 0, 255])
}

context.putImageData(imageData, 0, 0)
