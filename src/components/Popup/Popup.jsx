import React, { useContext } from "react";
import { CenterContext } from '../../context';


const Popup = ({ formData, onInputChange, onSave, onCancel }) => {
  const { center, setCenter, setLabel, setId } = useContext(CenterContext);

  return (
    <div className="popup">
      <label>
        Lat:
        <input
          type="number"
          step={0.01}
          value={center.lat}
          onChange={(e) => {
            setCenter(prev => ({
              ...prev,
              lat: Number(e.target.value)
            }))
            onInputChange("latitude", e.target.value)
          }}
        />
      </label>
      <label>
        Lng:
        <input
          type="number"
          step={0.01}
          value={center.lng}
          onChange={(e) => {
            setCenter(prev => ({
              ...prev,
              lng: Number(e.target.value)
            }))
            onInputChange("longitude", e.target.value)
          }}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          onInput={(e) => {
            e ? setLabel(e.target.value) : setLabel('');
          }}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
        />
      </label>

      <button
        onClick={() => {
          setId(prev => prev + 1);
        onSave();

      }} className="button">Зберегти/Редагувати</button>
      <button onClick={onCancel} className="button">Скасувати</button>
    </div>
  );
};

export default Popup;
