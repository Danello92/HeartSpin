import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import { gsap } from "gsap/dist/gsap";



//loading
const TextureMaps =new THREE.TextureLoader();

const texturemapsloader = TextureMaps.load('/map/NormalMap2.png');
// Debug

const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const shape = new THREE.Shape();
const x = -2.5;
const y = -5;
shape.moveTo(x + 2.5, y + 2.5);
shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

const extrudeSettings = {
  steps: 2,  // ui: steps
  depth: 2,  // ui: depth
  bevelEnabled: true,  // ui: bevelEnabled
  bevelThickness: 1,  // ui: bevelThickness
  bevelSize: 1,  // ui: bevelSize
  bevelSegments: 2,  // ui: bevelSegments
};

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

// Materials

const material = new THREE.MeshStandardMaterial();

material.metalness = 0.3;
material.roughness = 0.2;
// material.normalMap = texturemapsloader;

material.color = new THREE.Color(0xF71616)

// Mesh
const sphere = new THREE.Mesh(geometry,material)


scene.add(sphere)
// sphere.gsap.timeline({sphere, x:3})

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 11
scene.add(pointLight)

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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 12
camera.rotateZ(160)
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();
    // const time1 =1;
    // const time2 =2;
    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    // const sphereX = sphere.scale.x +time1;
    // const sphereY = sphere.scale.y +time2;
    // if((sphereX%2==1))
    // {
    //     sphere.scale.x=1;
    //     sphere.scale.y=1;
    // }else if(sphereY%2==0){
    //     sphere.scale.x=2;
    //     sphere.scale.y=2;
    // }
    // console.log(sphereX)

    // // Update Orbital Controls
    // controls.update()
   
    // Render
    renderer.render(scene, camera)

    // setTimeout(function() {
        

        // animating/drawing code goes here


    
    // Call tick again on the next frame
   window.requestAnimationFrame(tick)
// },3000);
}

tick();
