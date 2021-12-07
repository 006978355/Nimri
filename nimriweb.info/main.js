import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import glowVertexShader from './shaders/glowVertex.glsl'
import glowFragmentShader from './shaders/glowFragment.glsl'

const scene = new THREE.Scene()
// Base camera
const canvasContainer = document.querySelector('#canvasContainer')
const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('canvas ')
})


renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)


//Creating the sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: new THREE.TextureLoader().load('./img/anon.png')
    }
  }
})
)
sphere.scale.set(1, 1, 1)

//creating the glowwwwww
//exp date:11/20
const glow = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
new THREE.ShaderMaterial({
  vertexShader: glowVertexShader, 
  fragmentShader: glowFragmentShader,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide 
})
)
glow.scale.set(1.2, 1.2, 1.2)
scene.add(glow)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

const starGeometry = new THREE.BufferGeometry()
const startMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})

const starVertices = []
for(let i = 0; i < 50000; i++){
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  starVertices.push(x, y, z)}


  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))


const stars = new THREE.Points(starGeometry, startMaterial)

scene.add(stars)

camera.position.z = 15

const mouse = {
  x: undefined, 
  y: undefined
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    sphere.rotation.y +=  0.001
    group.rotation.y = mouse.x * 0.5
}    
animate()

addEventListener('mousemove',() => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = (event.clientY / innerHeight) * 2 + 1
})

/*document.addEventListener('mousemove', onDocumentMouseMove)

 let mouseX = 0 
 let mouseY = 0
 
 let targetX = 0 
 let targetY = 0
 
 const windowHalfX = window.innerWidth / 2;
 const windowHalfY = window.innerHeight / 2;

 function onDocumentMouseMove(event){
     mouseX = (event.clientX - windowHalfX)
     mouseY = (event.clientY - windowHalfY)
 }

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);
const clock = new THREE.Clock()

const tick = () =>
{      
    targetX = mouseX * .001 
    targetY = mouseY * .001
    
    
    credit card name: Santa Claus
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()*/
