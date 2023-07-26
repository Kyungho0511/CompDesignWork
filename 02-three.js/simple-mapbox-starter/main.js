mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-73.9651476, 40.8075355], // starting position [lng, lat] Columbia University
  zoom: 11, // starting zoom
});


// load data
const post_office = 'https://data.cityofnewyork.us/resource/bdha-6eqy.json'
const daylight_parks_geojson = './data/Columbia__Daylight_analysis.geojson'
const daylight_street_geojson = './data/Columbia_daylight_streets.geojson'

const fetchPostOfficeLocations = async () => {
  const response = await fetch(post_office);
  const data = await response.json();
  // console.log(data);
  
  data.forEach(post_office => {

    let latitude = post_office.the_geom.coordinates[1]
    let longitude = post_office.the_geom.coordinates[0]

    // create the content
    let content = `${post_office.streetname} ${post_office.city}`

    // create the popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(content)

     // attach the popup to the marker
    new mapboxgl.Marker({ color: 'black' })
        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(map);
  })
}

fetchPostOfficeLocations();

map.on('load', () => {

  map.addSource('park', {
      type: 'geojson',
      data: daylight_parks_geojson
  });

  map.addSource('street', {
    type: 'geojson',
    data: daylight_street_geojson
});

  // Add a layer showing the daylighting layer
  map.addLayer({
      'id': 'park-layer',
      'type': 'fill',
      'source': 'park',
      'paint': {
          'fill-outline-color': 'rgba(0,0,0,0.1)',
          'fill-color': 'rgba(0,0,0,0.5)'
      }
  })

  map.addLayer({
    'id': 'street-layer',
    'type': 'line',
    'source': 'street',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
        'line-color': '#888',
        'line-width': 2
    }
  })
})