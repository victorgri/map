import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useCallback, useContext, useRef, useState } from "react";

import './Map.css';
import Popup from "../Popup/Popup";
import { CurrentLocationMarker } from "../CurrentLocationMarker/CurrentLocationMarker";
import { Context } from "../../context";
import dog from '../../assets/img/dog.svg';
import cat from '../../assets/img/cat.svg';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaulOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControll: true,
};

export const Map = React.memo(() => {
  const {
    addMarker,
    center,
    markers,
    label,
    id
  } = useContext(Context);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    longitude: 0,
    latitude: 0,
    name: "",
    description: "",
    tag: "",
  });
  const [activeMArker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMArker) {
      return;
    }
    setActiveMarker(marker);
  };


  const openPopup = () => {

    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = () => {
    addMarker(center, id, label, closePopup);
  };

  const mapRef = useRef(undefined)

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds();
    console.log(bounds.getNorthEast())
    // console.log(bounds);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  return (
    <div className="container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaulOptions}
        onClick={() => {
          openPopup();
          setActiveMarker(null)
        }}
        panTo={(latLng) => console.log(latLng)}
      >
        <CurrentLocationMarker position={center} />
        { 
          markers.map(marker => {
            return (
              <Marker
                position = { marker.pos }
                icon = {{
                  url: marker.tag === 'dog' ? dog : cat,
                    scaledSize: {
                      width: 40,
                      height: 50
                    }
                  }
                }
                key={marker.id}
                desc={marker.description}
                onClick={() => handleActiveMarker(marker.id)}
              >
                {activeMArker === marker.id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <h2>{marker.title}</h2>
                      <p>{marker.description}</p>
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
            )
          })
        }
        {isPopupOpen && (
          <Popup
            formData={formData}
            onInputChange={handleInputChange}
            onSave={handleSave}
            onCancel={closePopup}
          />
        )}
      </GoogleMap>
    </div>
  )
})