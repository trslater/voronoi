import { GUI } from "dat.gui"

import { makeApp } from "./app.js"

const gui = new GUI()
const app = makeApp(document.getElementById("voronoi"))
