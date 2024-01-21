import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useContext, useRef, useState } from "react";

import './Map.css';
import Popup from "../Popup/Popup";
import { CurrentLocationMarker } from "../CurrentLocationMarker/CurrentLocationMarker";
import { CenterContext } from "../../context";
import markerImg from '../../assets/img/sponge-bob.svg';

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

export const Map = () => {
  const {
    addMarker,
    center,
    markers,
    label,
    id,
    setId
  } = useContext(CenterContext);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    longitude: 0,
    latitude: 0,
    name: "",
    description: "",
    tag: "",
  });

  console.log(markers);

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
    setId(prev => prev + 1)
    addMarker(center, id, label);
    closePopup();
  };

  const mapRef = useRef(undefined)

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
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
        onClick={openPopup}
      >
        <CurrentLocationMarker position={center} />
        {
          markers.map(marker => (
          <Marker
            position={marker.pos}
            label={marker.title}
            img={markerImg}
            key={marker.key}
          />
          ))
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
}