import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { MAP_API_KEY } from "../config.js";

const MapContainer = props => {
  const [state, setState] = useState({});
  let location = {};
  window.navigator.geolocation.getCurrentPosition(function x(a) {
    location = a.coords;
  });

  // setState({stores: location});

  console.log(state);

  const displayMarkers = () => {
    return (
      <Marker
        position={{
          lat: 97.155,
          lng: 39.25
        }}
        onClick={() => console.log("You clicked me!")}
      />
    );
  };

  return (
    <Map
      google={props.google}
      zoom={8}
      style={mapStyles}
      initialCenter={{
        lat: state.stores.latitude,
        lng: state.stores.longitude
      }}
    >
      {displayMarkers()}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY
})(MapContainer);

const mapStyles = {
  width: `calc(100% - 360px)`,
  marginTop: "2.5%",
  height: "90%"
};
