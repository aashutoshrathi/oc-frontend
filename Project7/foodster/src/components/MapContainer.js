import React, { useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { MAP_API_KEY } from "../config.js";

const MapContainer = props => {
  const [state, setState] = useState({
    location: {},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  });

  window.navigator.geolocation.getCurrentPosition(function getCoords(loc) {
    setState({ location: loc.coords });
  });

  const getPlaces = () => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${state.location.latitude},${state.location.longitude}&radius=1500&type=restaurant&key=${MAP_API_KEY}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));
  };

  const onMarkerClick = (props, marker, e) => {
    getPlaces();
    setState({
      ...state,
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log(state);
  };

  const onMapClicked = props => {
    if (state.showingInfoWindow) {
      setState({ ...state, showingInfoWindow: false, activeMarker: null });
    }
    console.log(state);
  };

  const displayMarkers = () => {
    return (
      <Marker
        position={{
          lat: state.location.latitude,
          lng: state.location.longitude
        }}
        onClick={onMarkerClick}
      />
    );
  };

  return (
    <>
      {state.location.longitude && (
        <Map
          google={props.google}
          zoom={12}
          style={mapStyles}
          onClick={onMapClicked}
          initialCenter={{
            lat: state.location.latitude,
            lng: state.location.longitude
          }}
        >
          {displayMarkers()}
          {state.showingInfoWindow && (
            <InfoWindow
              marker={state.activeMarker}
              visible={state.showingInfoWindow}
            >
              <div>
                {/* <h1>{state.selectedPlace.name}</h1> */}
                <h1>Hi</h1>
              </div>
            </InfoWindow>
          )}
        </Map>
      )}
    </>
  );
};

// const LoadingContainer = (props) => (
//   <div>Fancy loading container!</div>
// )

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY
  // LoadingContainer: LoadingContainer
})(MapContainer);

const mapStyles = {
  width: `calc(100% - 360px)`,
  marginTop: "3.4%",
  height: "92.6%"
};
