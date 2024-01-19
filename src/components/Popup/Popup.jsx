import React, { useContext } from "react";
import { CenterContext } from '../../context';


const Popup = ({ formData, onInputChange, onSave, onCancel }) => {
  const { center, setCenter } = useContext(CenterContext);

  return (
    <div className="popup">
      <label>
        Lat:
        <input
          type="number"
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
      {/* Додайте аналогічні мітки та вводи для широти, імені, опису та тегу */}
      <button onClick={onSave} className="button">Зберегти/Редагувати</button>
      <button onClick={onCancel} className="button">Скасувати</button>
    </div>
  );
};

export default Popup;
