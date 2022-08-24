import { Application } from "pixi.js"

export const makeApp = viewport => {
    const app = new Application({ resizeTo: viewport })

    viewport.appendChild(app.view)

    return {}
}
