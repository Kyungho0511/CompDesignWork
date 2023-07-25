console.log('this file is loaded')

// import three library
import * as THREE from 'three';
import datgui from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/+esm'
import statsJs from 'https://cdn.jsdelivr.net/npm/stats-js@1.0.1/+esm'

// addons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// get a reference to the container that will hold the scene
const container = document.querySelector('#scene-container');

/*
  ===== GLOBAL VARIABLES
*/
const WIDTH = container.clientWidth
const HEIGHT = container.clientHeight

const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100

/*
  ===== SCENE
*/
const scene = new THREE.Scene();
scene.background = new THREE.Color('#233143');

/*
  ===== CAMERA
*/
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
camera.position.set(4, 8, 10)
camera.lookAt(scene.position);

/*
  ===== GRID HELPER
*/
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

/*
  ===== RENDERER
*/
const renderer = new THREE.WebGLRenderer();
// set the size
renderer.setSize( WIDTH, HEIGHT );
// set device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
// add automatically created canvas element to the webpage
container.appendChild( renderer.domElement );

/*
  ===== LOAD GLTF FILES
*/

// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load('./models/yborg-cop/scene.gltf', function(gltf) {
  scene.add(gltf.scene);
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.position.set(0, 10, 0);
});


/*
  ===== LIGHTING
*/
const ambientLight = new THREE.AmbientLight("white", 0.6)
scene.add(ambientLight)

// add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );

// deat gui variable
const gui = new datgui.GUI({name: 'Basic Project'});

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 30)
cameraFolder.open()

// declare the stats variable
const stats = new statsJs
// 0: fps, 1: ms, 2: mb, 3+: custom
stats.showPanel(0)
document.body.appendChild( stats.dom );

/*
  ===== ANIMATION LOOP
*/
function animate() {
    requestAnimationFrame( animate );
  
    renderer.render(scene, camera);
  }
  
  animate()