import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Map({ location, handleLocation, should_zoom }) {
  const [center, setCenter] = useState();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAHPUufTlBkF5NfBT3uhS9K4BbW2N-mkb4",
  });
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(20);

  useEffect(() => {
    if (location.coordinates) {
      setCenter({
        lat: location.coordinates[1],
        lng: location.coordinates[0],
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location.coordinates]);

  useEffect(() => {
    if (center?.lat) setLoading(false);
  }, [center?.lat]);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
    setTimeout(() => {
      if (location.coordinates) {
        setCenter({
          lat: location.coordinates[1],
          lng: location.coordinates[0],
        });
      } else {
        setLoading(false);
      }
      setZoom(should_zoom ? 15 : 5);
    }, 1000);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    isLoaded &&
    !loading && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onCenterChanged={() => {
          setTimeout(() => {
            setZoom(should_zoom ? 15 : 5);
          }, 1000);
        }}
      >
        <Marker
          position={center}
          draggable
          onDragEnd={async (e) => {
            const res = await axios({
              url: `https://maps.googleapis.com/maps/api/geocode/json`,
              method: "GET",
              params: {
                latlng: `${e.latLng.lat()}, ${e.latLng.lng()}`,
                sensor: true,
                key: "AIzaSyAHPUufTlBkF5NfBT3uhS9K4BbW2N-mkb4",
              },
            });
            handleLocation(
              e.latLng.lat(),
              e.latLng.lng(),
              res?.data?.results[0]?.formatted_address
            );
          }}
        />
      </GoogleMap>
    )
  );
}

export default Map;
