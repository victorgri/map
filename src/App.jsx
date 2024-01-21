import { useJsApiLoader } from "@react-google-maps/api";
import { Map } from "./components/Map";
import { useState } from "react";
import { CenterContext } from "./context";

const API_KEY = process.env.REACT_APP_API_KEY;

const libraries = ['places'];
const defaultCenter = {
  lat: 47.9,
  lng: 33.4,
};

export const App = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState([]);
  const [label, setLabel] = useState([]);
  const [id, setId] = useState(0);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const addMarker = (pos, key, label) => {
    setMarkers([...markers, {
      pos,
      key: id,
      title: label
    }]);
  }

  return (
    <CenterContext.Provider value={{
      center,
      setCenter,
      addMarker,
      markers,
      label,
      setLabel,
      id,
       setId
    }}>
      <div className="app">
        {isLoaded ? <Map center={center} /> : <h2>Loading...</h2>}
      </div>
    </CenterContext.Provider>

  )
}