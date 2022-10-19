var map = L.map("map", {
    center: [0,0],
    zoom: 2
});


L.tileLayer('maps/mapimgs/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 4,
    continuousWorld: false,
    noWrap: true,
}).addTo(map);

// var latlngs = [
//     [[45.51, -122.68],
//      [37.77, -122.43],
//      [34.04, -118.2]],
//     [[40.78, -73.91],
//      [41.83, -87.62],
//      [32.76, -96.72]]
// ];

// var polyline = L.polyline(latlngs, {color: '#FFFFFF'}).addTo(map);

// // zoom the map to the polyline
// map.fitBounds(polyline.getBounds());