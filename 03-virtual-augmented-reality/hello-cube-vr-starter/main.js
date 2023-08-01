console.log('hello')

// query the scene
const scene = document.querySelector("a-scene");

// create a new entity
const cube = document.createElement("a-box");

// query models
const smartphone = document.querySelector('.smartphone')

let count = 0;
const tick = () => {
  count += 0.005
  requestAnimationFrame(tick);
  smartphone.setAttribute('position', `${-1 - Math.abs((Math.sin(count * 2))) * 5} 2.5 -5`)
  smartphone.setAttribute('rotation', `0 ${(Math.sin(count * 5)) * Math.PI * 10} 0`)
} 
tick()