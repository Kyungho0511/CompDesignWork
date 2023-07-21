import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// create a scene
const container = document.querySelector('#scene-container');
const scene = new THREE.Scene();
const WIDTH = container.clientWidth;
const HEIGHT = container.clientHeight;
scene.background = new THREE.Color('#233143');

// create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
container.appendChild(renderer.domElement);

// create a camera
const FOV = 75;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 100;
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
camera.position.set(4, 0, 10);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement)

// create objects
const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
const boxMaterial = new THREE.MeshLambertMaterial({ color: '#ffff00' });
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.set(0, 0, 4);
scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: '#ff00ff' })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-2, 0, 4);
scene.add(sphere)

// create lightings
const ambientLight = new THREE.AmbientLight('white', 0.1)
scene.add(ambientLight)

const directonalLight = new THREE.DirectionalLight('white', 1)
directonalLight.position.set(10, 10, 10)
scene.add(directonalLight)

// update scene
const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0.01
  // sphere.position.x = Math.sin(ellapsedTime) * 10

  renderer.render(scene, camera)
}
animate();