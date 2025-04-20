import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import GUI from 'lil-gui'
import { GLTFLoader, DRACOLoader } from 'three/examples/jsm/Addons.js'
import tentVertex from './shaders/tent/vertex.glsl'
import tentFragment from './shaders/tent/fragment.glsl'
import fireVertex from './shaders/fire/vertex.glsl'
import fireFragment from './shaders/fire/fragment.glsl'
import smokeVertex from './shaders/smoke/vertex.glsl'
import smokeFragment from './shaders/smoke/fragment.glsl'
import waterVertex from './shaders/water/vertex.glsl'
import waterFragment from './shaders/water/fragment.glsl'


/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
gltfLoader.setDRACOLoader(dracoLoader)
const textureLoader = new THREE.TextureLoader()

/**
 * Base
 */
// Debug
// const gui = new GUI()
// gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// lights
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

// fire
const campFire = new THREE.PointLight('#E87F35', 2, 0)
campFire.position.set(3.457, 1.317, 5.113)
// campFire.castShadow = true
scene.add(campFire)

// peach lights
const peachLight = new THREE.PointLight('#FFA49B', 10.5, 0)
const helper1 = new THREE.PointLightHelper(peachLight);

peachLight.position.set(-5, 3, 8.5)
// peachlight.target.position.set(-7.058, -10.0486, 4.65122)
scene.add(peachLight, 
    // helper1
)
// scene.add(peachlight.target)

// blue light
const blueLight = new THREE.DirectionalLight('#8DDDED', 3)
const helper = new THREE.DirectionalLightHelper(blueLight);
blueLight.position.set(6, 4.5, 4.57449)
blueLight.rotation.set(1, 0.5, -0.5)
scene.add(blueLight,
    // helper
)

// yellow light
const yellowLight = new THREE.PointLight('#FFAE38', 8.5, 0)
const helperyellow = new THREE.PointLightHelper(yellowLight);
yellowLight.position.set(0.5, 3, -7.5)
yellowLight.rotation.set(-1.5, 1.5, 0)
scene.add(yellowLight,
    // helperyellow
)

// darkblue light
const darkblueLight = new THREE.DirectionalLight('#7672FF', 2)
const darkhelper = new THREE.DirectionalLightHelper(darkblueLight);
darkblueLight.position.set(-9, 2, -4.57449)
darkblueLight.rotation.set(0, -3.5, -1)
scene.add(darkblueLight,
    // darkhelper
)

// gui
// const blueLightfolder = gui.addFolder('Bluelight').close()
// blueLightfolder.add(blueLight.position, 'x').min(-10).max(10).step(0.5).name('positionX')
// blueLightfolder.add(blueLight.position, 'y').min(-10).max(10).step(0.5).name('positionY')
// blueLightfolder.add(blueLight.position, 'z').min(-10).max(10).step(0.5).name('positionZ')

// blueLightfolder.add(blueLight.rotation, 'x').min(-10).max(10).step(0.5).name('rotationX')
// blueLightfolder.add(blueLight.rotation, 'y').min(-10).max(10).step(0.5).name('rotationY')
// blueLightfolder.add(blueLight.rotation, 'z').min(-10).max(10).step(0.5).name('rotationZ')


// const darkblueLightfolder = gui.addFolder('DarkBluelight').close()
// darkblueLightfolder.add(darkblueLight.position, 'x').min(-10).max(10).step(0.5).name('positionX')
// darkblueLightfolder.add(darkblueLight.position, 'y').min(-10).max(10).step(0.5).name('positionY')
// darkblueLightfolder.add(darkblueLight.position, 'z').min(-10).max(10).step(0.5).name('positionZ')

// darkblueLightfolder.add(darkblueLight.rotation, 'x').min(-10).max(10).step(0.5).name('rotationX')
// darkblueLightfolder.add(darkblueLight.rotation, 'y').min(-10).max(10).step(0.5).name('rotationY')
// darkblueLightfolder.add(darkblueLight.rotation, 'z').min(-10).max(10).step(0.5).name('rotationZ')


// const yellowLightfolder = gui.addFolder('Yellowlight').close()
// yellowLightfolder.add(yellowLight.position, 'x').min(-10).max(10).step(0.5).name('positionX')
// yellowLightfolder.add(yellowLight.position, 'y').min(-10).max(10).step(0.5).name('positionY')
// yellowLightfolder.add(yellowLight.position, 'z').min(-10).max(10).step(0.5).name('positionZ')

// yellowLightfolder.add(yellowLight.rotation, 'x').min(-10).max(10).step(0.5).name('rotationX')
// yellowLightfolder.add(yellowLight.rotation, 'y').min(-10).max(10).step(0.5).name('rotationY')
// yellowLightfolder.add(yellowLight.rotation, 'z').min(-10).max(10).step(0.5).name('rotationZ')


// const peachLightfolder = gui.addFolder('peachlight').close()
// peachLightfolder.add(peachLight.position, 'x').min(-10).max(10).step(0.5).name('positionX')
// peachLightfolder.add(peachLight.position, 'y').min(-10).max(10).step(0.5).name('positionY')
// peachLightfolder.add(peachLight.position, 'z').min(-10).max(10).step(0.5).name('positionZ')

// peachLightfolder.add(peachLight.rotation, 'x').min(-10).max(10).step(0.5).name('rotationX')
// peachLightfolder.add(peachLight.rotation, 'y').min(-10).max(10).step(0.5).name('rotationY')
// peachLightfolder.add(peachLight.rotation, 'z').min(-10).max(10).step(0.5).name('rotationZ')

/**
 * custom materials
 */

// texture
const perlinTexture = textureLoader.load('textures/perlin.png')
perlinTexture.wrapT = THREE.RepeatWrapping
perlinTexture.wrapS = THREE.RepeatWrapping

const tentCloth = new THREE.ShaderMaterial({
    vertexShader: tentVertex,
    fragmentShader: tentFragment,
    // wireframe: true,
    uniforms:{
        uTime: new THREE.Uniform(0),
        

    },
    transparent: true,
    side: THREE.DoubleSide,
})

const fire = new THREE.ShaderMaterial({
    vertexShader: fireVertex,
    fragmentShader: fireFragment,
    // wireframe: true,
    uniforms:{
        uTime: new THREE.Uniform(0),
        uPerlinTexture: new THREE.Uniform(perlinTexture),

    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
})


const smoke = new THREE.ShaderMaterial({
    vertexShader: smokeVertex,
    fragmentShader: smokeFragment,
    // wireframe: true,
    uniforms:{
        uTime: new THREE.Uniform(0),
        uPerlinTexture: new THREE.Uniform(perlinTexture),

    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,

})

// const tree = new THREE.ShaderMaterial({
//     vertexShader: treeVertex,
//     vertexColors: true,
//     fragmentShader: treeFragment,
//     // wireframe: true,
//     uniforms:{
//         uTime: new THREE.Uniform(0),
//         // uColor: new THREE.Color('#5a4233'),


//     },
//     // transparent: true,
//     // side: THREE.DoubleSide,
// })


/**
 * Models
 */

// sea
const seaMaterial = new THREE.ShaderMaterial({
    // color: 'lightblue',
    transparent: true,
    vertexShader: waterVertex,
    fragmentShader: waterFragment,
    uniforms: {
        uTime: new THREE.Uniform(0),
        uPerlinTexture: new THREE.Uniform(perlinTexture),
    }

})

const sea = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    seaMaterial
)
sea.rotation.x = - Math.PI / 2
scene.add(sea)

// island
const island = () => {
    gltfLoader.load('models/island.glb', (gltf) => {
        // console.log(gltf);
        
        // gltf.scene.traverse((child) => {
        //     child.receiveShadow = true
        // })
        scene.add(gltf.scene)
    })
}
island()

// tent
// let sm
const tent = () => {
    gltfLoader.load('models/tent.glb', (gltf) => {
        // console.log(gltf.scene);
        
        gltf.scene.traverse((child) => {
            // child.castShadow = true
            if(child.name === 'tent_cloth')
                child.material = tentCloth
            if(child.name === 'fire_wood_fire2')
            {
                // sm = child
                child.material = fire
            }
                
            if(child.name === 'smoke')
            {
                
                child.material = smoke

            }
                // child.material = smoke
        })
        // const smhelper = new THREE.AxesHelper()
        // smhelper.position.copy(sm.position)
        scene.add(gltf.scene)
    })
}
tent()

// coconut trees
let tree_1, tree_2, tree_3, tree_4, tree_5, tree_6

const coconutTrees = () => {
    gltfLoader.load('models/ct.glb', (gltf) => {
        gltf.scene.traverse((child) => {
            // console.log(child)
                
            // const treePattern = /^tree_\d+$/;

            // if (treePattern.test(child.name)) {
            //     const geometry = child.geometry;
            // const vertexCount = geometry.attributes.position.count;

            // // Create an offset attribute with a unique random value for this tree
            // const offsets = new Float32Array(vertexCount).fill(Math.random() * Math.PI * 2);
            // geometry.setAttribute('offset', new THREE.BufferAttribute(offsets, 1));
            //     child.material = tree
            // }
            if(child.name === 'tree_1')
                tree_1 = child
            if(child.name === 'tree_2')
                tree_2 = child
            if(child.name === 'tree_3')
                tree_3 = child
            if(child.name === 'tree_4')
                tree_4 = child
            if(child.name === 'tree_5')
                tree_5 = child
            if(child.name === 'tree_6')
                tree_6 = child
        })
        scene.add(gltf.scene)
        // console.log(gltf)
    })
}
coconutTrees()


// crabs
let hCrab = null
const crabs = () => {
    gltfLoader.load('models/crabs.glb', (gltf) => {
        // console.log(gltf.scene);
        
        gltf.scene.traverse((child) => {
            if(child.name === 'h_crab')
                hCrab = child
        })
        scene.add(gltf.scene)
    })
}
crabs()

// help
const help = () => {
    gltfLoader.load('models/help.glb', (gltf) => {
        scene.add(gltf.scene)
    })
}
help()

// rocks
const rocks = () => {
    gltfLoader.load('models/rocks.glb', (gltf) => {
        scene.add(gltf.scene)
    })
}
rocks()


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// : 4.993161839259817, y: 2.520026248347725, z: 8.283205955928604}
// camera.position.set(6.5, 2.8, 10)
camera.position.set(4.99, 2.52, 8.28)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 3.5
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = -1.0;
controls.enablePan = false
controls.maxDistance = 27
controls.maxPolarAngle = Math.PI / 2.2
controls.minDistance = 6.9


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setClearColor('#050A30')
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{    

        
    
    // ElapsedTime
    const elapsedTime = clock.getElapsedTime()

    // animate
    if(hCrab)
        hCrab.position.y = Math.sin(Math.PI * elapsedTime * 0.2) + 1.2

    if(tree_1)
    {
        tree_1.rotation.z =  -20 + Math.sin(Math.PI + elapsedTime * 0.2) * 0.1 + 1.2
        tree_2.rotation.z =  -20 + Math.sin(Math.PI + elapsedTime * 0.3 ) * 0.1 + 1.2
        tree_3.rotation.z =  90 + Math.sin(Math.PI + elapsedTime * 0.4) * 0.1 + 1.2
        tree_4.rotation.x =  90 + Math.sin(Math.PI + elapsedTime * 0.5) * 0.1 + 1.2
        tree_5.rotation.z =  -20 + Math.sin(Math.PI + elapsedTime * 0.6) * 0.1 + 1.2
        tree_6.rotation.z =  -20 + Math.sin(Math.PI + elapsedTime * 0.2) * 0.1 + 1.2
    }
    
    
    // update uniform
    tentCloth.uniforms.uTime.value = elapsedTime
    smoke.uniforms.uTime.value = elapsedTime
    fire.uniforms.uTime.value = elapsedTime
    seaMaterial.uniforms.uTime.value = elapsedTime
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()