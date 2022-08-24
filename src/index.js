import { GUI } from "dat.gui"

const gui = new GUI()

const viewport = document.getElementById("viewport")

const width = viewport.offsetWidth
const height = viewport.offsetHeight

const canvas = document.createElement("canvas")

canvas.width = width
canvas.height = height

viewport.appendChild(canvas)

const context = canvas.getContext("2d")
