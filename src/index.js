import { GUI } from "dat.gui"

import { makeEnvironment } from "./environment.js"

const gui = new GUI()
const env = makeEnvironment(document.getElementById("voronoi"))

window.onresize = () => {
    env.resize()
}

env.start()
