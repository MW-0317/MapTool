var map = L.map("map", {
    center: [0,0],
    zoom: 2
});

// TODO: Allow the option of exporting and importing latlngs
var latlngs = [
    [[10, 10],
     [30, 30],
     [30, 40]],
    [[10, 13],
     [27, 30],
     [27, 45]]
];

var holdingCtrl = false;
var holdingAlt = false;

var polyline = L.polyline(latlngs[0], {color: '#b32f20',  weight: 15}).addTo(map);
L.polyline(latlngs[1], {color: '#1ac734', weight: 15}).addTo(map);

map.on('mousemove', (e) => {
    e.latlng.lat = Math.round(e.latlng.lat);
    e.latlng.lng = Math.round(e.latlng.lng);
    document.getElementById("MousePos").innerHTML = e.latlng;
});

map.on('click', (e) => {
    if (holdingAlt == false) return;
    e.latlng.lat = Math.round(e.latlng.lat);
    e.latlng.lng = Math.round(e.latlng.lng);
    if (holdingCtrl){
        
    }
    console.log(e.latlng);
    latlngs[0].push([e.latlng.lat, e.latlng.lng]);
    polyline.remove()
    polyline = L.polyline(latlngs[0], {color: '#b32f20',  weight: 15}).addTo(map);
});


// TODO: Add the option of holding ctrl to make the creation of points more precise
map.on('keydown', (e) => {
    holdingAlt = e.originalEvent.altKey;
    holdingCtrl = e.originalEvent.ctrlKey;
    if (holdingAlt){
        map.dragging.disable();
    }
})

map.on('keyup', (e) => {
    holdingCtrl = e.originalEvent.ctrlKey;
    holdingAlt = e.originalEvent.altKey;
    if (!holdingAlt){
        map.dragging.enable();
    }
})


// zoom the map to the polyline
map.fitBounds(polyline.getBounds());

function toFullString(lst){
    // console.log(lst + " " + typeof(lst))
    if (typeof (lst) == "object"){
        var empStr = "["
        for (var i = 0; i < lst.length; i++){
            let a = toFullString(lst[i])
            empStr = empStr + a
            if (i + 1 < lst.length){
                empStr = empStr + ", "
            }
        }
        empStr = empStr + "]"
        return empStr;
    }
    else{
        return lst.toString();
    }
}


function latlngClipboard(){
    console.log(toFullString(latlngs));
    // navigator.clipboard.writeText(toFullString(latlngs));
}