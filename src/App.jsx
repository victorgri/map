import { useJsApiLoader } from "@react-google-maps/api";
import { Map } from "./components/Map";
import { useState } from "react";
import { CenterContext } from "./context";

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(`apikey:${API_KEY}`);

const libraries = ['places'];

export const App = () => {
  const [center, setCenter] = useState({
    lat: 47.9,
    lng: 33.4,
  });



  console.log(typeof center.lat);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  return (
    <CenterContext.Provider value={{
      center,
      setCenter,
    }}>
      <div className="app">
        {isLoaded ? <Map center={center} /> : <h2>Loading...</h2>}
      </div>
    </CenterContext.Provider>

  )
}