import React, { useContext } from "react";
import Select from 'react-select';

import { Context } from '../../context';
import './Popup.css';
import { defaultCenter, options} from '../../assets/constants';


const Popup = ({ formData, onInputChange, onSave, onCancel }) => {
  const {
    center,
    setCenter,
    setLabel,
    setId,
    setDesc,
    setTag,
    message
  } = useContext(Context);

  return (
    <form className="popup">
      <label className="popup__item">
        Latitude:
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
      <label className="popup__item">
        Longetude:
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
      <label className="popup__item">
        Name:
        <input
          type="text"
          onInput={(e) => {
            e.target.value.length ? setLabel(e.target.value) : setLabel('');
          }}
        />
      </label>
      <label className="popup__item">
        Description:
        <input
          type="text"
          onInput={(e) => {
            e.target ? setDesc(e.target.value) : setDesc('');
          }}
        />
      </label>
      <label className="popup__item">
        Tag: 
        <Select
          options={options}
          style={{ width: '100px' }}
          onChange={(e) => setTag(e.value)}
        />
      </label>

      <button
        onClick={(e) => {
          e.preventDefault();
          setId(prev => prev + 1);
          onSave();
          setCenter(defaultCenter)
        }} className="button">Зберегти/Редагувати</button>
      <button onClick={onCancel} className="button">Скасувати</button>
      <div>{message}</div>
    </form>
  );
};

export default Popup;
