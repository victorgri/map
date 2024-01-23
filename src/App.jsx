import { useJsApiLoader } from "@react-google-maps/api";
import { Map } from "./components/Map";
import { useEffect, useState } from "react";
import { Context } from "./context";
import { defaultCenter } from "./assets/constants";

const API_KEY = process.env.REACT_APP_API_KEY;

const libraries = ['places'];


export const App = () => {
  const [map, setMap] = useState(null);

  const [tag, setTag] = useState('');
  const [desc, setDesc] = useState('');
  const [center, setCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState([]);
  const [label, setLabel] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState(1);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });
  
  useEffect(() => {
    fetch('http://localhost:3030/markers')
    .then(res => res.json())
      .then(dataFromServer => {
        setMarkers(dataFromServer)
        setId(dataFromServer.length + 1)
      });
  }, []);

  const addMarker = (pos, key, label, closePopup) => {
    const marker = {
      pos,
      id: key,
      title: label,
      description: desc,
      tag: tag
    };

    fetch('http://localhost:3030/markers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(marker),
    })
      .then(res => {
        if (res.ok) {
          setMessage('Done');
          setTimeout(() => {
            setMarkers([...markers, marker]);
            closePopup();
            setMessage(null);
          }, 2000);
        }
      });
  }

  return (
    <Context.Provider value={{
      center,
      setCenter,
      addMarker,
      markers,
      label,
      setLabel,
      id,
      setId,
      desc,
      setDesc,
      tag,
      setTag,
      message,
      setMap,
      map
    }}>
      <div className="app">
        {isLoaded ? <Map center={center} /> : <h2>Loading...</h2>}
      </div>
    </Context.Provider>

  )
}