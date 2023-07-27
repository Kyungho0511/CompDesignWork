// access public token
mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;


// render the map
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-73.9651476, 40.8075355], // starting position [lng, lat] Columbia University
  zoom: 11, // starting zoom
  antialias: true,
  pitch: 64.9
});

// custom layer
map.on('style.load', function() {
  map.addLayer({
      id: 'custom_layer',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function(map, mbxContext){
          // threebox code goes in here
          tb = new Threebox(
            map, 
            mbxContext,
            { defaultLights: true }
          );

          const scale = 3.2
          const options = {
            obj: './models/metlife_building/scene.gltf',
            type: 'gltf',
            scale: { x: scale, y: scale, z: 2.7 },
            rotation: { x: 90, y: -90, z: 0 },
            units: 'meters',
          }

          tb.loadObj(options, (building) => {

            building.setCoords([-73.976799, 40.754145]);
            building.setRotation({ x: 0, y: 0, z: 241 });
            tb.add(building);                        
          })
      },
      render: function () {
        tb.update();
      }
  })
})