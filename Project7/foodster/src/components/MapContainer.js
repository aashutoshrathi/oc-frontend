import React, { useState } from "react";
import { connect } from "react-redux";
import store from "../store";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { MAP_API_KEY, DINE_ICON, ZOOM } from "../config.js";
import { fetchRestaurants } from "../store/actions/actions.js";

const MapContainer = props => {
  const [state, setState] = useState({
    location: {},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places: []
  });

  const gStore = store.getState().reducer;

  const getPlaces = () => {
    setState({
      ...state,
      places: gStore.data,
      loading: gStore.loading
    });
    console.log(state);
  };

  const onMarkerClick = (props, marker, e) => {
    setState({
      ...state,
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  const onMapClicked = () => {
    if (state.showingInfoWindow) {
      setState({ ...state, showingInfoWindow: false, activeMarker: null });
    }
  };

  const displayCurrentLocation = () => {
    return (
      <Marker
        position={{
          lat: props.location.latitude,
          lng: props.location.longitude
        }}
        name={"Your location"}
        onClick={onMarkerClick}
      />
    );
  };

  const displayMarkers = () => {
    return state.places.map(place => {
      const { lat, lng } = place.geometry.location;
      return (
        <Marker
          key={place.place_id}
          position={{
            lat,
            lng
          }}
          name={place.name}
          onClick={onMarkerClick}
          icon={{
            url: DINE_ICON,
            scaledSize: new props.google.maps.Size(22.5, 22.5)
          }}
        />
      );
    });
  };

  return (
    <>
      {props.location.longitude && (
        <Map
          google={props.google}
          zoom={ZOOM}
          style={mapStyles}
          onReady={getPlaces}
          onClick={onMapClicked}
          initialCenter={{
            lat: props.location.latitude,
            lng: props.location.longitude
          }}
        >
          {displayMarkers()}
          {displayCurrentLocation()}
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

const mapStateToProps = state => ({
  places: state.reducer.data
});

export default connect(
  mapStateToProps,
  { fetchRestaurants }
)(
  GoogleApiWrapper({
    apiKey: MAP_API_KEY
  })(MapContainer)
);

const mapStyles = {
  width: `calc(100% - 360px)`,
  marginTop: "3.4%",
  height: "92.6%"
};
