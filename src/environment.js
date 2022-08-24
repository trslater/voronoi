import { MOUSE, OrthographicCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const pad = 0.1


export const makeEnvironment = viewport => {
    const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true
    })
    const camera = new OrthographicCamera()
    const controls = new OrbitControls(camera, renderer.domElement)
    const scene = new Scene()

    const add = obj => {
        scene.add(obj)
    }

    const start = () => {
        viewport.appendChild(renderer.domElement)
        resize()
        animate()
    }

    const animate = () => {
        controls.update()
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }
    
    const resize = () => {
        const width = viewport.offsetWidth
        const height = viewport.offsetHeight

        const bottom = 10*(1 + pad)/2
        const aspect = width/height
        
        camera.top = bottom
        camera.bottom = -bottom
        camera.left = -bottom*aspect
        camera.right = bottom*aspect
        camera.near = -100
        camera.far = 100
        camera.updateProjectionMatrix()
    
        renderer.setSize(width, height)
    }
    
    
    return { add, start, resize }
}
