import React, { useState } from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Geocode from "react-geocode";

import { fetchRestaurants, addRestaurant } from "../store/actions/actions.js";
import AddRestaurantForm from "./AddRestaurantForm";

import { MAP_API_KEY, DINE_ICON, ZOOM } from "../config.js";

Geocode.setApiKey(MAP_API_KEY);

const MapContainer = props => {
  const [state, setState] = useState({
    location: {},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places: []
  });

  const [open, setOpen] = useState(false);
  const [geo, setGeo] = useState({});
  const [address, setAddress] = useState({});

  const handleDbClick = (e, a, loc) => {
    setGeo({ location: { lat: loc.latLng.lat(), lng: loc.latLng.lng() } });
    Geocode.fromLatLng(loc.latLng.lat(), loc.latLng.lng()).then(
      res => {
        setAddress(res.results[0].formatted_address);
      },
      error => {
        console.error(error);
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewRestraunt = () => {
    const name = document.getElementById("name").value;
    const vicinity = document.getElementById("address").value;
    const geometry = geo;
    const place_id = JSON.parse(localStorage.getItem("count") || 0) + 1;
    const restaurant = { name, vicinity, geometry, place_id };
    props.addRestaurant(restaurant);
    setOpen(false);
  };

  const handleDrag = (e, a) => {
    const { setLocation } = props;
    setLocation({ latitude: a.center.lat(), longitude: a.center.lng() });
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
    return props.places.map(place => {
      const { lat, lng } = place.geometry.location;
      return (
        <Marker
          key={place.place_id}
          position={{
            lng,
            lat
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
      <AddRestaurantForm
        open={open}
        handleClose={handleClose}
        addNewRestraunt={addNewRestraunt}
        address={address}
      />
      {props.location.longitude && (
        <Map
          google={props.google}
          zoom={ZOOM}
          disableDoubleClickZoom={true}
          style={mapStyles}
          onReady={displayMarkers}
          onClick={onMapClicked}
          onDblclick={handleDbClick}
          onDragend={handleDrag}
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
  places: state.reducer.filteredData
});

export default connect(
  mapStateToProps,
  { fetchRestaurants, addRestaurant }
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
