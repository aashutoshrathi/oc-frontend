import React, { useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { MAP_API_KEY } from "../config.js";

const MapContainer = props => {
  const [state, setState] = useState({
    location: {},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places: []
  });

  window.navigator.geolocation.getCurrentPosition(function getCoords(loc) {
    setState({ ...state, location: loc.coords });
  });

  const getPlaces = () => {
    const { latitude, longitude } = state.location;
    const url = `http://foodster.glitch.me/getPlaces/${latitude}/${longitude}`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setState({ ...state, places: res });
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
  };

  const onMapClicked = props => {
    if (state.showingInfoWindow) {
      setState({ ...state, showingInfoWindow: false, activeMarker: null });
    }
  };

  // const displayCurrentLocation = () => {
  //   return (
  //     <Marker
  //       position={{
  //         lat: state.location.latitude,
  //         lng: state.location.longitude
  //       }}
  //       name={"Your location"}
  //       onClick={onMarkerClick}
  //     />
  //   );
  // };

  const displayMarkers = () => {
    return state.places.map(place => {
      return (
        <Marker
          key={place.place_id}
          position={{
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
          }}
          name={place.name}
          onClick={onMarkerClick}
        />
      );
    });
  };

  return (
    <>
      {state.location.longitude && (
        <Map
          google={props.google}
          zoom={18}
          style={mapStyles}
          onReady={getPlaces}
          onClick={onMapClicked}
          initialCenter={{
            lat: state.location.latitude,
            lng: state.location.longitude
          }}
        >
          {displayMarkers()}
          <InfoWindow
            marker={state.activeMarker}
            visible={state.showingInfoWindow}
          >
            <div>
              <h4>{state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
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
