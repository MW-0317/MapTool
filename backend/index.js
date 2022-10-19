const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
const port = 80

app.use(cors())

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.use("/", (req, res, next) => {
//     console.log(req.url)
//     if (req.url.startsWith("/src/leaflet")){
//         res.send("Forbidden");
//     }
//     next();
// })

app.use(express.static('C:/Users/marki/Documents/MapTool/frontend/src'));
app.use(express.static('C:/Users/marki/Documents/MapTool/frontend/testLocation'));
app.use("/train", express.static('C:/Users/marki/Documents/MapTool/frontend/trainmap'))

app.post("/image", (req, res) => {
    console.log(req)
    res.send()
});


app.get("/dnd", (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var fullUrlNew = req.protocol + '://' + req.get('host') + ":30000";
    res.redirect(fullUrlNew);
});


app.post("/setTrain/:id/", (req, res) => {
    res.sendStatus(200);
    console.log(req.body)
    var loc = [req.body.x, req.body.y];
    var cons = req.body.cons.split(" ");
    cons.forEach((element, index) => {
        cons[index] = parseInt(element)
    });
    console.log(cons)

})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});




/*

{
    "ids": {
        "1": {
            "loc": [6, 2],
            "connections": [
                2, 5
            ],
        },
        "2": {
            "loc": [5, 3],
            "connections": [
                3, 5
            ],
        },
        "3": {
            "loc": [3, 3],
            "connections": [
                2, 4
            ],
        },
        "4": {
            "loc": [2, 1],
            "connections":[
                3, 5
            ]
        },
        "5" : {
            "loc": [4, 1],
            "connections":[
                2, 4
            ],
        }
    }
}

*/