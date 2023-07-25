console.log('Hello Three.js')

// import the THREE library
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// import the D3 library
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// get a reference to the scene-container element that will eventually hold the scene
const container = document.querySelector('#scene-container')

// set the width and height of the container to a global variable
const WIDTH = container.clientWidth
const HEIGHT = container.clientHeight

// create a scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#233143');

// create variables for camera parameters
const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100
// create a camera
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
// position the camera away from the origin
camera.position.set(4, 8, 10)
camera.lookAt(scene.position);

// add grid helper
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

// create the renderer
const renderer = new THREE.WebGLRenderer();
// set the size of the renderer
renderer.setSize(WIDTH, HEIGHT)
// add automatically created canvas element to the webpage
container.appendChild(renderer.domElement);

// d3 data binding
const chart_width = window.innerWidth;
const chart_height = window.innerHeight - 60;
const padding = 10;
const margin = { top: 30, right: 0, bottom: 60, left: 30 };

let svg = d3
    .select('canvas')
    .append('svg')
        .attr('width', chart_width + margin.left + margin.right)
        .attr('height', chart_height + margin.top + margin.bottom)
        .attr('class', 'bar-chart');
console.log(svg)

// load external data here <--
d3.csv('./assets/FIFA World Cup Attendance.csv', d3.autoType)
.then(data => {
    console.log(data);

    // y scale, Attendance
    const y_scale = d3.scaleLinear()
        .range([chart_height, 0])
        .domain([0, d3.max(data, d => d['Total_Attendance'])])

    // x scale, Year
    let xMin = d3.min(data, d => d['Year'])
    let xMax = d3.max(data, d => d['Year'])

    const x_scale = d3.scaleTime()
        .domain([new Date(xMin), new Date(xMax)])
        .range([0, chart_width])

    const barWidth = Math.round(chart_width / data.length);
    svg.selectAll('rect')
        .data(data)
        .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('height', d => chart_height - y_scale(d['Total_Attendance']))
            .attr('width', barWidth - padding)
            .attr('transform', (d, i) => {
                let translate = barWidth * i
                return `translate(${translate}, 0)`
            })
});


// add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    requestAnimationFrame( animate );

    renderer.render(scene, camera);
}
animate()
