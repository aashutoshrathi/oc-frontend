const express = require("express");
const app = express();
const MAP_API_KEY = process.env.MAPS_KEY;
const compression = require("compression");
const axios = require("axios");
const secret = process.env.SECRET;

// compress all request
app.use(compression());
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static("public"));

app.get("/", function(request, res) {
  res.send("Nothing Here mate!");
});

app.get("/getPlaces/:lat/:long", (req, res) => {
  const { lat, long } = req.params;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=restaurant&key=${MAP_API_KEY}`;
  axios.get(url).then(response => {
    console.log(response.data);

    res.send(response.data.results);
  });
});

app.get("/getDetail/:id", (req, res) => {
  const { id } = req.params;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${MAP_API_KEY}`;
  axios.get(url).then(response => {
    console.log(response.data);
    res.send(response.data.result);
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
